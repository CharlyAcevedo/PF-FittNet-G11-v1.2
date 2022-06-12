const mongoose = require("mongoose");
const Gims = require("../models/Gyms");
const Address = require("../models/Address");
const Service = require("../models/Service");
const User = require("../models/User");
const Gyms = require("../models/Gyms");
const Partner = require("../models/Partner");
const Plan = require("../models/Plan");
const { putGymAddresses, putGymsSocialMedia } = require("./helpers");

async function getAllGyms() {
  try {
    const response = await Gims.find({})
      .populate("address")
      .populate("services");
    return response;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
}

async function getGymById(id) {
  try {
    const response = await Gims.findById({ _id: id })
      .populate("address")
      .populate("services");
    return response;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
}

async function getGymByName(name) {
  try {
    const response = await Gims.find(name);
    return response;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
}

async function postGyms(idUser, gyms) {
  try {
    const userToAddGym = await User.findById({ _id: idUser }).populate(
      "partner"
    );
    const partnerComplete = await Partner.findById(userToAddGym.partner[0]._id)
      .populate("planType")
      .populate("socialNetworks")
      .populate("gyms");

    const gymsPermited = partnerComplete.planType.gymsPermited;
    const currentGymsNumber = partnerComplete.gyms.length;
    const numberOfGymsComing = gyms.length;

    let notEquals = [];
    let gymsCreatedIds = [];
    let gymsCreated = [];
    let serviceToCreateNE = [];
    let addressesToCreateNE = [];
    let sMediaToCreateNE = [];
    let currentGyms = 0;
    let gymsToAdd = 0;
    let gymsToDiscount = 0;

    if (currentGymsNumber <= 0) {
      for (let i = 0; i < numberOfGymsComing; i++) {
        if (!gyms[i].id) {
          let newGym = {
            name: gyms[i].name,
            price: gyms[i].price,
            raiting: gyms[i].raiting,
            image: gyms[i].image,
            latitude: gyms[i].latitude,
            longitude: gyms[i].longitude,
            trainers: gyms[i].trainers,
            logo: gyms[i].logo,
            phone: gyms[i].phone,
            email: gyms[i].email,
            gymActive: gyms[i].gymActive,
            favourite: gyms[i].favourite,
          };
          gymsToAdd = gymsToAdd + 1;
          notEquals.push(newGym);
          serviceToCreateNE.push(gyms[i].services)
          addressesToCreateNE.push(gyms[i].address);
          sMediaToCreateNE.push(gyms[i].socialNetworks);
        } else {
          gymsToDiscount = gymsToDiscount + 1;
          const idToSet = gyms[i].id;
          gymsCreatedIds.push(idToSet);
          // await putService(idUser, idToSet, gyms[i].services)
          await Gyms.findByIdAndUpdate(idToSet, gyms[i], { new: true });
          await Partner.findByIdAndUpdate(
            partnerComplete._id,
            { gyms: [...gyms, idToSet] },
            { new: true }
          );
        }
      }
    } else {
      for (let i = 0; i < numberOfGymsComing; i++) {
        for (let g = 0; g < currentGymsNumber; g++) {
          if (gyms[i].id === partnerComplete.gyms[g]._id.toString()) {
            let newGym = {
              name: gyms[i].name,
              price: gyms[i].price,
              raiting: gyms[i].raiting,
              image: gyms[i].image,
              latitude: gyms[i].latitude,
              longitude: gyms[i].longitude,
              trainers: gyms[i].trainers,
              logo: gyms[i].logo,
              phone: gyms[i].phone,
              email: gyms[i].email,
              gymActive: gyms[i].gymActive,
              favourite: gyms[i].favourite,
            };
            currentGyms = currentGyms + 1;
            const gymUpdated = await Gyms.findByIdAndUpdate(
              gyms[i].id,
              newGym,
              { new: true }
            );
            const newSMedia = await putGymsSocialMedia(
              gyms[i].id,
              gyms[i].socialNetworks
            );
            const newAddressGym = await putGymAddresses(
              gyms[i].id,
              gyms[i].address
            );
            gymsCreatedIds.push(gyms[i].id);
          } else if (gyms[i].id) {
            console.log("no deberia pasar por aqui");
            let newGym = {
              name: gyms[i].name,
              price: gyms[i].price,
              raiting: gyms[i].raiting,
              image: gyms[i].image,
              latitude: gyms[i].latitude,
              longitude: gyms[i].longitude,
              trainers: gyms[i].trainers,
              logo: gyms[i].logo,
              phone: gyms[i].phone,
              email: gyms[i].email,
              gymActive: gyms[i].gymActive,
              favourite: gyms[i].favourite,
            };
            gymsToAdd = gymsToAdd + 1;
            notEquals.push(newGym);
            addressesToCreateNE.push(gyms[i].address);
            sMediaToCreateNE.push(gyms[i].socialNetworks);
          } else {
            console.log(
              "pasa aqui si no tiene id, es decir si se va a crear el gym"
            );
            let newGym = {
              name: gyms[i].name,
              price: gyms[i].price,
              raiting: gyms[i].raiting,
              image: gyms[i].image,
              latitude: gyms[i].latitude,
              longitude: gyms[i].longitude,
              trainers: gyms[i].trainers,
              logo: gyms[i].logo,
              phone: gyms[i].phone,
              email: gyms[i].email,
              gymActive: gyms[i].gymActive,
              favourite: gyms[i].favourite,
            };
            gymsToAdd = gymsToAdd + 1;
            notEquals.push(newGym);
            addressesToCreateNE.push(gyms[i].address);
            sMediaToCreateNE.push(gyms[i].socialNetworks);
          }
        }
      }
    }

    let canCreate = gymsPermited - currentGymsNumber;

    if (canCreate <= 0) {
      if (gymsToAdd <= 0) {
        return "Se actualizo su informacion del gym satisfactoriamente";
      } else {
        return "No puede crear mas gimnasios, revise o actualize su plan";
      }
    } else if (canCreate < gymsToAdd) {
      let cutGyms = gymsToAdd - canCreate;
      for (let i = 0; i < cutGyms; i++) {
        notEquals.pop();
        addressesToCreateNE.pop();
        sMediaToCreateNE.pop();
      }
      for (let i = 0; i < gymsToAdd; i++) {
        const newGym = new Gyms(notEquals[i]);
        await newGym.save();
        const newGymAddress = await putGymAddresses(
          newGym._id,
          addressesToCreateNE[i]
        );
        const newSMedia = await putGymsSocialMedia(
          newGym._id,
          sMediaToCreateNE[i]
        );
        gymsCreatedIds.push(newGym._id);
        gymsCreated.push(newGym);
      }
    } else if (canCreate >= gymsToAdd && gymsToAdd === notEquals.length) {
      for (let i = 0; i < gymsToAdd; i++) {
        const newGym = new Gyms(notEquals[i]);
        await newGym.save();
        const newGymAddress = await putGymAddresses(
          newGym._id,
          addressesToCreateNE[i]
        );
        console.log(newGymAddress);
        const newSMedia = await putGymsSocialMedia(
          newGym._id,
          sMediaToCreateNE[i]
        );
        gymsCreatedIds.push(newGym._id);
        gymsCreated.push(newGym);
      }
    }
    console.log(gymsCreatedIds);
    const newPartner = await Partner.findByIdAndUpdate(
      userToAddGym.partner[0]._id,
      { gyms: gymsCreatedIds },
      { new: true }
    );
    return partnerComplete;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
}

async function saveGyms(id, data) {
  let newServices = await data.map((s) => {
    let sToPush = Service.findById({ _id: s });
    return sToPush;
  });
  let gymToUpdate = await Gims.updateOne(
    {
      _id: id,
    },
    {
      services: data,
    }
  );
  let response = await Gims.findById({
    _id: id,
  })
    .populate("address")
    .populate("services");
  return response;
}

const updateFavGym = async (req, res) => {
    const { id } = req.params
    try {

        if (req.body.favourite) {
            const userFav = await User.findById(req.body.idUser)
            const gymFav = await Gims.findById(id)
            if (userFav.favourite.includes(id)) {

                const userPull = await User.findByIdAndUpdate(req.body.idUser, { $pull: { favourite: id } }, { new: true })
                const obj = { favourite: gymFav.favourite - 1 }
                const gymfav = await Gims.findByIdAndUpdate(id, obj, { new: true })

                return res.status(200).json({
                    ok: 'true',
                    gym: gymfav,
                    user: userPull,
                })
            } else {

                const user = await User.findByIdAndUpdate(req.body.idUser, { $push: { favourite: id } }, { new: true })

                const obj = { favourite: gymFav.favourite + 1 }
                const gym = await Gims.findByIdAndUpdate(id, obj, { new: true })

                return res.status(200).json({
                    ok: 'true',
                    gym,
                    user,
                })
            }
        }
    } catch (error) {
        console.log("error", error)
        res.status(500).send({
            ok: true,
            msg: "no pudiste darle like"
        })
    }
}


module.exports = { getAllGyms, postGyms, saveGyms, getGymById, getGymByName, updateFavGym }
