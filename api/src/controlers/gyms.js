const mongoose = require("mongoose");
const Gims = require("../models/Gyms");
const Address = require("../models/Address");
const Service = require("../models/Service");
const User = require("../models/User");
const Gyms = require("../models/Gyms");
const Partner = require("../models/Partner");
const Plan = require("../models/Plan");
const { putGymAddresses, putGymsSocialMedia } = require("./helpers");
const { putService } = require("./services");

async function getAllGyms() {
  try {
    const response = await Gims.find({})
      .populate("address")
      .populate("services")
      .populate("socialNetworks");
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
      .populate("services")
      .populate("socialNetworks");
    return response;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
}

async function getGymByName(name) {
  try {
    const response = await Gims.find(name)
    .populate("address")
    .populate("services")
    .populate("socialNetworks");
    return response;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
}

async function postGyms(idUser, gyms) {
  // idUser - id del usario que crea el gym
  // gym arreglo de objetos (gyms) con propiedades y valores de cada gym a crear
  try { 
    console.log("si llega aqui", Object.keys(gyms))
    if(Object.keys(gyms).length === 0) return {      
      Ok: false,
      msg: "No se recibio info del Gym, por lo que no se realizo ninguna acción"
    }
    console.log("no paso por el if")
    const userToAddGym = await User.findById({ _id: idUser }).populate(
      "partner"
    ); //trae el usuario
    const partnerComplete = await Partner.findById(userToAddGym.partner[0]._id) //trae el partner del usuario
      .populate("planType")
      .populate("socialNetworks")
      .populate("gyms");

    const gymsPermited = partnerComplete.planType.gymsPermited; //guarda los gyms permitidos
    const currentGymsNumber = partnerComplete.gyms.length; //guarda cuantos gyms ya tiene el partner
    const numberOfGymsComing = gyms.length; //guarda el numero de gyms a setear

    let notEquals = [];
    let gymsCreatedIds = [];
    let gymsCreated = [];
    let serviceToCreateNE = [];
    let addressesToCreateNE = [];
    let sMediaToCreateNE = [];
    let currentGyms = 0;
    let gymsToAdd = 0;
    let gymsToDiscount = 0;

    if (currentGymsNumber <= 0) { //si aun no tiene ningun gym seteado pasa aqui
      for (let i = 0; i < numberOfGymsComing; i++) {
        if (!gyms[i].id) { //pasan aqui los gyms sin id, es decir son nuevos a crear
          let newGym = {
            name: gyms[i].name,
            price: gyms[i].price ? gyms[i].price : 0,
            raiting: gyms[i].raiting ? gyms[i].raiting : 0,
            image: gyms[i].image ? gyms[i].image : "",
            latitude: gyms[i].latitude,
            longitude: gyms[i].longitude,
            trainers: gyms[i].trainers ? gyms[i].trainers : [],
            logo: gyms[i].logo ? gyms[i].logo : "",
            phone: gyms[i].phone ? gyms[i].phone : 0,
            email: gyms[i].email ? gyms[i].email : "",
            gymActive: gyms[i].gymActive ? gyms[i].gymActive : true,
            favourite: gyms[i].favourite ? gyms[i].favourite : 0,
          };
          gymsToAdd = gymsToAdd + 1;
          notEquals.push(newGym);
          serviceToCreateNE.push(gyms[i].services);
          addressesToCreateNE.push(gyms[i].address);
          sMediaToCreateNE.push(gyms[i].socialNetworks);
        } else { //si manda un id un usuario nuevo pero que ya su gym esta en el sistema, pasa aqui,
                  //pensado para los usuarios que ya estan y que no tienen gyms seteados para setearles gyms 
                  //que ya existen en el sistema por ahora nada mas etapa develop, posteriormente no deberia 
                  //volver a pasar por aqui
          while (
            gymsToDiscount <= gymsPermited ||
            gymsToDiscount <= numberOfGymsComing
          ) { //pasa al bucle mientras tenga gyms permitidos y/o tenga gyms por setear y actualizar
            gymsToDiscount = gymsToDiscount + 1; //suma al contador
            const idToSet = gyms[i].id; //guarda el id del gym en una variable
            gymsCreatedIds.push(idToSet); //guarda el id en un array para setear al partner despues
            const newGym = await Gyms.findByIdAndUpdate(idToSet, gyms[i], { new: true });// actualiza la info del gym
            await putService(idUser, idToSet, gyms[i].services); //manda los servicios a crear o actualizar
            await putGymsSocialMedia(idToSet, gyms[i].socialNetworks); //manda las redes a crear o actualizar
            await putGymAddresses(idToSet, gyms[i].address); ////manda la direccion a crear o actualizar 
            gymsCreated.push(newGym);         
          }
          gymsPermited = gymsPermited - gymsToDiscount; //se ajusta el numero de permitidos si se agrego alguno
        }
      }
    } else { //llega aqui si el partner ya tiene por lo menos un gym creado
      for (let i = 0; i < numberOfGymsComing; i++) {  //recorre todos los gyms que mando el usuario para crear o modificar
        for (let g = 0; g < currentGymsNumber; g++) { //recorre los gyms que ya tiene el usuario en la base
          if (gyms[i].id === partnerComplete.gyms[g]._id.toString()) { //entra aqui si el gym que mando ya lo tenia seteado
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
            currentGyms = currentGyms + 1; // cuenta los gyms que ya tenia el usuario y se actualizaron
            const gymUpdated = await Gyms.findByIdAndUpdate( //actualiza los datos generales del gym actual
              gyms[i].id,
              newGym,
              { new: true }
            );
            const newServices = await putService( //manda los servicios a crear o actualizar
              idUser, 
              gyms[i].id, 
              gyms[i].services
              ); 
            const newSMedia = await putGymsSocialMedia( //manda a la funcion para actualizar o crear las redes del gym
              gyms[i].id,
              gyms[i].socialNetworks
            );
            const newAddressGym = await putGymAddresses( //manda a la funcion para actualizar o crear la direccion del gym
              gyms[i].id,
              gyms[i].address
            );
            gymsCreatedIds.push(gyms[i].id); //agrega el id del gym actualizado a la lista para actualizar el partner despues
            gymsCreated.push(gymUpdated);
          } else if (gyms[i].id) { //entra aqui solamente si mando un gym con id pero que no este seteado al usuario, en teoria no deberia entrar aqui nunca
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
            gymsToAdd = gymsToAdd + 1; //cuenta los gyms a agregar que no tiene ya el usuario en la base
            notEquals.push(newGym); //agrega a la lista el nuevo gym a crear o setear 
            serviceToCreateNE.push(gyms[i].services); //agrega los servicios a una lista de creacion posterior
            addressesToCreateNE.push(gyms[i].address); //agrega la direccion del gym a una lista para setear luego
            sMediaToCreateNE.push(gyms[i].socialNetworks); //agrega las redes sociales a una lista para setear luego
          } else { //pasa aqui si no tiene id, es decir si se va a crear el gym como nuevo
            console.log(
              "pasa aqui si no tiene id, es decir si se va a crear el gym"
            );
            let newGym = {
              name: gyms[i].name,
              price: gyms[i].price ? gyms[i].price : 0,
              raiting: gyms[i].raiting ? gyms[i].raiting : 0,
              image: gyms[i].image ? gyms[i].image : "",
              latitude: gyms[i].latitude,
              longitude: gyms[i].longitude,
              trainers: gyms[i].trainers ? gyms[i].trainers : [],
              logo: gyms[i].logo ? gyms[i].logo : "",
              phone: gyms[i].phone ? gyms[i].phone : 0,
              email: gyms[i].email ? gyms[i].email : "",
              gymActive: gyms[i].gymActive ? gyms[i].gymActive : true,
              favourite: gyms[i].favourite ? gyms[i].favourite : 0,
            };
            gymsToAdd = gymsToAdd + 1; //cuenta los gyms a agregar que no tiene ya el usuario en la base
            notEquals.push(newGym); //agrega a la lista el nuevo gym a crear o setear
            serviceToCreateNE.push(gyms[i].services); //agrega los servicios a una lista de creacion posterior
            addressesToCreateNE.push(gyms[i].address); //agrega la direccion del gym a una lista para setear luego
            sMediaToCreateNE.push(gyms[i].socialNetworks); //agrega las redes sociales a una lista para setear luego
          }
        }
      }
    } //termina la primera fase, aqui ya deben quedar guardados los cambios a gyms que ya tenia el partner seteados

    let canCreate = gymsPermited - currentGymsNumber; //calcula cuantos gyms mas se pueden crear

    if (canCreate <= 0) { //entra aqui si ya no puede crear nuevos gyms
      if (gymsToAdd <= 0) { //checa si hay gyms por crear
        return {
          Ok: true,
          msg:"Se actualizo la informacion satisfactoriamente"
        }; //si no tiene mas por agregar
      } else {
        return {
          Ok: false,
          msg:"No puede crear mas gimnasios, revise o actualize su plan"
        }; //si quedaron sin agregar
      }
    } else if (canCreate < gymsToAdd) { //entra aqui si tiene mas gyms de los que puede crear
      let cutGyms = gymsToAdd - canCreate; //creo una variable numerica para ver cuantos gyms puede crear
      for (let i = 0; i < cutGyms; i++) { //en este bucle quito los gyms que no se pueden crear o de mas
        notEquals.pop();
        serviceToCreateNE.pop();
        addressesToCreateNE.pop();
        sMediaToCreateNE.pop();
      }
      for (let i = 0; i < gymsToAdd; i++) { //en este bucle se crean  o actualizan los gyms que se permitieron
        const newGym = new Gyms(notEquals[i]);
        await newGym.save();
        const newServices = await putService( //manda los servicios a crear o actualizar
        idUser, 
        newGym._id,
        serviceToCreateNE[i]
        ); 
        const newGymAddress = await putGymAddresses( //manda las direcciones a crear o actualizar
          newGym._id,
          addressesToCreateNE[i]
        );
        const newSMedia = await putGymsSocialMedia( //manda las redes a crear o actualizar
          newGym._id,
          sMediaToCreateNE[i]
        );
        gymsCreatedIds.push(newGym._id); //agrega a la lista el id del gym creado
        gymsCreated.push(newGym); //no se si esto valla al final
      }
    } else if (canCreate >= gymsToAdd && gymsToAdd === notEquals.length) { //entra aqui si puede crear todos los gyms que mando
      for (let i = 0; i < gymsToAdd; i++) { //en este bucle se crean o actualizan los gyms que se permitieron
        const newGym = new Gyms(notEquals[i]);
        await newGym.save();
        const newServices = await putService( //manda los servicios a crear o actualizar
        idUser, 
        newGym._id,
        serviceToCreateNE[i]
        ); 
        const newGymAddress = await putGymAddresses( //manda las direcciones a crear o actualizar
          newGym._id,
          addressesToCreateNE[i]
        );
        const newSMedia = await putGymsSocialMedia( //manda las redes a crear o actualizar
          newGym._id,
          sMediaToCreateNE[i]
        );
        gymsCreatedIds.push(newGym._id);
        gymsCreated.push(newGym);
      }
    } // cuando llega aqui ya se crearon y actualizaron todos los gyms que tenia permitidos, 
      // falta setear los ids de los gyms al partner
    
    const newPartner = await Partner.findByIdAndUpdate( //aqui setea los ids de los gyms creados al partner
      userToAddGym.partner[0]._id,
      { gyms: gymsCreatedIds },
      { new: true }
    );
    return {
      Ok: true,
      msg: "Se actualizo la informacion satisfactoriamente",
      newPartner,
      gymsCreated
    };
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
