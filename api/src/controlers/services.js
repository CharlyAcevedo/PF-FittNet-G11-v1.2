const mongoose = require("mongoose");
const Gims = require("../models/Gyms");
const Address = require("../models/Address");
const Service = require("../models/Service");
const User = require("../models/User");
const Gyms = require("../models/Gyms");
const Partner = require("../models/Partner");
const Plan = require("../models/Plan");
const { putGymAddresses, putGymsSocialMedia } = require("./helpers");

async function getAllServices() {}

async function getServiceDetail() {}

async function putService(idUser, idGym, gymServices) {
  try {
    const userToAdd = await User.findById(idUser); //trae el usuario
    const partnerToAdd = await Partner.findById(
      userToAdd.partner[0]._id
    ).populate("planType"); //trae el partner con su plan
    const gymToAdd = await Gyms.findById(idGym); //trae el gym

    const servicesPermited = partnerToAdd.planType.servicePerGym; //guarda los servicios permitidos
    const currentServicesNumber = gymToAdd.services.length; //guarda numero de servicios actualmente en el gym
    const servicesComingToAdd = gymServices.length; //guarda cuantos servicios vienen para guardar o crear

    let notEquals = [];
    let servicesCreatedIds = [];
    let servicesCreated = [];
    let serviceToCreateNE = [];
    let addressesToCreateNE = [];
    let sMediaToCreateNE = [];
    let currentservices = 0;
    let servicesToAdd = 0;
    let servicesToDiscount = 0;

    console.log("llega al inicio");
    if (currentServicesNumber <= 0) {
      //si aun no tiene ningun servicio seteado pasa aqui
      for (let i = 0; i < servicesComingToAdd; i++) {
        if (!gymServices[i].id) {
          //pasan aqui los servicios sin id, es decir son nuevos a crear
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
          //si manda un id un usuario nuevo pero que ya su servicio esta en el sistema, pasa aqui,
          //pensado para los usuarios que ya estan y que no tienen servicios seteados para setearles servicios
          //que ya existen en el sistema por si pueden tomar servicios existentes
          while (
            servicesToDiscount <= servicesPermited ||
            servicesToDiscount <= servicesComingToAdd
          ) {
            servicesToDiscount = servicesToDiscount + 1;
            const idToSet = gymServices[i].id;
            const newService = await Service.findByIdAndUpdate(
              idToSet,
              gymServices[i],
              {
                new: true,
              }
            );
            servicesCreatedIds.push(idToSet);
            servicesCreated.push(newService);
          }
          servicesPermited = servicesPermited - servicesToDiscount; //se ajusta el numero de permitidos si se agrego alguno
        }
      }
    } else {
      //llega aqui si el gym ya tiene por lo menos un servicio seteado
      for (let i = 0; i < servicesComingToAdd; i++) {
        //recorre todos los servicios que mando el usuario para crear o modificar
        for (let g = 0; g < currentServicesNumber; g++) {
          //recorre los servicios que ya tiene el gym en la base
          if (gymServices[i].id === gymToAdd.services[g]._id.toString()) {
            //entra aqui si el servicio que mando ya lo tenia seteado
            let newService = {
              name: gymServices[i].name,
              description: gymServices[i].description,
              duration: gymServices[i].duration,
              price: gymServices[i].price,
              photo: gymServices[i].photo,
              profileCategory: gymServices[i].profileCategory,
            };
            currentservices = currentservices + 1; // cuenta los servicios que ya tenia el gym y se actualizaron
            const serviceUpdated = await Service.findByIdAndUpdate(
              //actualiza el servicio
              gymServices[i].id,
              newService,
              { new: true }
            );
            servicesCreatedIds.push(gymServices[i].id); //agrega el id del servicio actualizado a la lista para actualizar el gym despues
            servicesCreated.push(serviceUpdated); //agrega el servicio creado o actualizado
          } else if (gymServices[i].id) {
            //entra aqui solamente si mando un gym con id pero que no este seteado al usuario, para reusar servicios
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
            //pasa aqui si no tiene id, es decir si se va a crear el servicio como nuevo
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
    } //termina la primera fase, aqui ya deben quedar guardados los cambios a servicios que ya tenia el partner seteados

    let canCreate = servicesPermited - currentServicesNumber; //calcula cuantos servicios mas se pueden crear

    if (canCreate <= 0) { //entra aqui si ya no puede crear nuevos
      if (servicesToAdd <= 0) { //checa si hay servicios por crear
        return "Se actualizo su informacion del gym satisfactoriamente";
      } else {
        return "No puede crear mas gimnasios, revise o actualize su plan";
      }
    } else if (canCreate < servicesToAdd) { //entra aqui si tiene mas servicios de los que puede crear
      let cutServices = servicesToAdd - canCreate; //creo una variable numerica para ver cuantos servicios puede crear
      for (let i = 0; i < cutServices; i++) { //en este bucle quito los servicios que no se pueden crear o de mas
        notEquals.pop();
      }
      for (let i = 0; i < servicesToAdd; i++) { //en este bucle se crean los servicios que se permitieron
        const newService = new Service(notEquals[i]);
        await newService.save();
        servicesCreatedIds.push(newService._id);
        servicesCreated.push(newService);
      }
    } else if (
      canCreate >= servicesToAdd &&
      servicesToAdd === notEquals.length
    ) { //entra aqui si puede crear todos los gyms que mando
      for (let i = 0; i < servicesToAdd; i++) { //en este bucle se crean los servicios que se permitieron
        const newService = new Service(notEquals[i]);
        await newService.save();
        servicesCreatedIds.push(newService._id);
        servicesCreated.push(newService);
      }
    } // cuando llega aqui ya se crearon y actualizaron todos los servicios que tenia permitidos, 
    // falta setear los ids de los gyms al partner

    const newGym = await Gyms.findByIdAndUpdate( //aqui setea los ids de los servicios creados al gym
      idGym,
      { services: servicesCreatedIds },
      { new: true }
    ).populate("services");
    return {
      Ok: true,
      msg: "Servicios creados o editados correctamente",
      newGym,
    };
  } catch (error) {
    return error.message;
  }
}

module.exports = { putService, getServiceDetail, getAllServices };
