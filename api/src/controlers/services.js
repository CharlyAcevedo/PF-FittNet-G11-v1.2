const mongoose = require("mongoose");
const Gims = require("../models/Gyms");
const Address = require("../models/Address");
const Service = require("../models/Service");
const User = require("../models/User");
const Gyms = require("../models/Gyms");
const Partner = require("../models/Partner");
const Plan = require("../models/Plan");
const { putGymAddresses, putGymsSocialMedia } = require("./helpers");

async function getAllServices() {

}

async function getServiceDetail() {
    
}

async function putService() {
    try {
        const gymToAdd = await Gyms.findById(idGym);
        let addressId = gymToAdd.address ? gymToAdd.address : "";
    
        if (!addressId || addressId === "") {
          console.log("entra aqui por ser nuevo")
          const newAddress = new Address(gymAddress);
          await newAddress.save();
          console.log(newAddress._id, "id desde nueva direccion")
          addressId = newAddress._id;
        } else {
          console.log("entra aqui por que si tiene id")
          console.log(gymAddress)
          delete gymAddress.id
          console.log(gymAddress)
          const addressUpdated = await Address.findByIdAndUpdate(
            addressId,
            gymAddress,
            { new: true }
          );
        }
        console.log(addressId, gymAddress)
        const gymUpdated = await Gyms.findByIdAndUpdate(
          idGym,
          { address: addressId },
          { new: true }
        );
    
        return gymUpdated;
      } catch (error) {
        return error.message;
      }
}


module.exports = { putService, getServiceDetail, getAllServices };