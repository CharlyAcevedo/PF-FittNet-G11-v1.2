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

async function putService(idUser, idGym, gymServices) {
    try {
        const userToAdd = await User.findById(idUser);
        const partnerToAdd = await Partner.findById(userToAdd.partner[0]._id).populate("planType")
        const gymToAdd = await Gyms.findById(idGym);

        const servicesPermited = partnerToAdd.planType.servicePerGym;
        const currentServicesNumber = gymToAdd.services.length;
        const servicesComingToAdd = gymServices.length;

        let notEquals = [];
        let servicesCreatedIds = [];
        let servicesCreated = [];
        let serviceToCreateNE = [];
        let addressesToCreateNE = [];
        let sMediaToCreateNE = [];
        let currentservices = 0;
        let servicesToAdd = 0;
        let servicesToDiscount = 0;

        if (currentServicesNumber <= 0 && servicesComingToAdd <= servicesPermited) {
            for (let i = 0; i < servicesComingToAdd; i++) {
              if (!gymServices[i].id) {
                let newService = {
                  name: gymServices[i].name,
                  description: gymServices[i].description,
                  duration: gymServices[i].duration,
                  price: gymServices[i].price,
                  photo: gymServices[i].photo,
                  profileCategory: gymServices[i].profileCategory,
                };
                servicesToAdd = servicesToAdd + 1;
                notEquals.push(newService); //aqui me quede
              } else {
                servicesToDiscount = servicesToDiscount + 1;
                const idToSet = gymServices[i].id;
                await Service.findByIdAndUpdate(idToSet, gymServices[i], { new: true });
                servicesCreatedIds.push(idToSet);
                servicesCreated.push(gymServices[i]);
              }
            }
          } else {
            for (let i = 0; i < servicesComingToAdd; i++) {
              for (let g = 0; g < currentServicesNumber; g++) {
                if (gymServices[i].id === gymToAdd.services[g]._id.toString()) {
                  let newService = {
                    name: gymServices[i].name,
                    description: gymServices[i].description,
                    duration: gymServices[i].duration,
                    price: gymServices[i].price,
                    photo: gymServices[i].photo,
                    profileCategory: gymServices[i].profileCategory,
                  };
                  currentservices = currentservices + 1;
                  const serviceUpdated = await Service.findByIdAndUpdate(
                    gymServices[i].id,
                    newService,
                    { new: true }
                  );
                  servicesCreatedIds.push(gymServices[i].id);
                  servicesCreated.push(gymServices[i]);
                } else if (gymServices[i].id) {
                  let newService = {
                    name: gymServices[i].name,
                    description: gymServices[i].description,
                    duration: gymServices[i].duration,
                    price: gymServices[i].price,
                    photo: gymServices[i].photo,
                    profileCategory: gymServices[i].profileCategory,
                  };
                  servicesToAdd = servicesToAdd + 1;
                  notEquals.push(newService);
                } else {
                  console.log(
                    "pasa aqui si no tiene id, es decir si se va a crear el gym"
                  );
                  let newService = {
                    name: gymServices[i].name,
                    description: gymServices[i].description,
                    duration: gymServices[i].duration,
                    price: gymServices[i].price,
                    photo: gymServices[i].photo,
                    profileCategory: gymServices[i].profileCategory,
                  };
                  servicesToAdd = servicesToAdd + 1;
                  notEquals.push(newService);
                }
              }
            }
          }
      
          let canCreate = servicesPermited - currentServicesNumber;

    if (canCreate <= 0) {
      if (servicesToAdd <= 0) {
        return "Se actualizo su informacion del gym satisfactoriamente";
      } else {
        return "No puede crear mas gimnasios, revise o actualize su plan";
      }
    } else if (canCreate < servicesToAdd) {
      let cutServices = servicesToAdd - canCreate;
      for (let i = 0; i < cutServices; i++) {
        notEquals.pop();
      }
      for (let i = 0; i < servicesToAdd; i++) {
        const newService = new Service(notEquals[i]);
        await newService.save();
        servicesCreatedIds.push(newService._id);
        servicesCreated.push(newService);
      }
    } else if (canCreate >= servicesToAdd && servicesToAdd === notEquals.length) {
      for (let i = 0; i < servicesToAdd; i++) {
        const newService = new Service(notEquals[i]);
        await newService.save();
        servicesCreatedIds.push(newService._id);
        servicesCreated.push(newService);
      }
    }
    const newGym = await Gyms.findByIdAndUpdate(
      idGym,
      { services: servicesCreatedIds },
      { new: true }
    ).populate("services");
    return {
        Ok: true,
        msg: "Servicios creados o editados correctamente",
        newGym
    };

    
       
      } catch (error) {
        return error.message;
      }
}


module.exports = { putService, getServiceDetail, getAllServices };