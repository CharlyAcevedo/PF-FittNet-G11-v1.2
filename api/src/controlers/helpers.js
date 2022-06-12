const mongoose = require("mongoose");
const User = require("../models/User");
const Partner = require("../models/Partner");
const Plan = require("../models/Plan");
const SocialMedia = require("../models/SocialMedia");
const Service = require("../models/Service");
const Address = require("../models/Address");
const Gyms = require("../models/Gyms");



const putSocialMedia = async (idUser, socialNetworks) => {
  try {
    const userToAdd = await User.findById(idUser).populate("partner");
    const idPartner = userToAdd.partner[0]._id;
    const sMediaUser = userToAdd.partner[0].socialNetworks;

    let newSocialNetworks = [];
    if (socialNetworks && socialNetworks.length > 0) {
      for (let i = 0; i < socialNetworks.length; i++) {
        if (!socialNetworks[i].id) {
          let newSM = {
            socialMedia: socialNetworks[i].socialMedia,
            userSM: socialNetworks[i].userSM,
          };
          const smToPush = new SocialMedia(newSM);
          await smToPush.save();
          newSocialNetworks = [...newSocialNetworks, smToPush._id];
        } else if (socialNetworks[i].id) {
          newSocialNetworks.push(socialNetworks[i].id);
          let newSM = {
            socialMedia: socialNetworks[i].socialMedia,
            userSM: socialNetworks[i].userSM,
          };
          const smUpdated = await SocialMedia.findByIdAndUpdate(
            socialNetworks[i].id,
            newSM,
            { new: true }
          );
        }
      }
    }
    const partnerUpdated = await Partner.findByIdAndUpdate(
      idPartner,
      { socialNetworks: newSocialNetworks },
      { new: true }
    );
    return "Redes Actualizadas";
  } catch (error) {
    return error.message;
  }
};

const putGymsSocialMedia = async (idGym, socialNetworks) => {
  try {
    const gymToAdd = await Gyms.findById(idGym);

    let newSocialNetworks = [];
    if (socialNetworks && socialNetworks.length > 0) {
      for (let i = 0; i < socialNetworks.length; i++) {
        if (!socialNetworks[i].id) {
          let newSM = {
            socialMedia: socialNetworks[i].socialMedia,
            userSM: socialNetworks[i].userSM,
          };
          const smToPush = new SocialMedia(newSM);
          await smToPush.save();
          newSocialNetworks = [...newSocialNetworks, smToPush._id];
        } else if (socialNetworks[i].id) {
          newSocialNetworks.push(socialNetworks[i].id);
          let newSM = {
            socialMedia: socialNetworks[i].socialMedia,
            userSM: socialNetworks[i].userSM,
          };
          const smUpdated = await SocialMedia.findByIdAndUpdate(
            socialNetworks[i].id,
            newSM,
            { new: true }
          );
        }
      }
    }
    const gymUpdated = await Gyms.findByIdAndUpdate(
      idGym,
      { socialNetworks: newSocialNetworks },
      { new: true }
    );
    return "Redes Actualizadas";
  } catch (error) {
    return error.message;
  }
};

const putGymAddresses = async (idGym, gymAddress) => {
  try {
    const gymToAdd = await Gyms.findById(idGym);
    let addressId = gymToAdd.address ? gymToAdd.address : "";

    if (!addressId || addressId === "") {
      const newAddress = new Address(gymAddress);
      await newAddress.save();
      addressId = newAddress._id;
    } else {
      delete gymAddress.id
      const addressUpdated = await Address.findByIdAndUpdate(
        addressId,
        gymAddress,
        { new: true }
      );
    }
    const gymUpdated = await Gyms.findByIdAndUpdate(
      idGym,
      { address: addressId },
      { new: true }
    );

    return gymUpdated;
  } catch (error) {
    return error.message;
  }
};

module.exports = { putSocialMedia, putGymAddresses, putGymsSocialMedia };