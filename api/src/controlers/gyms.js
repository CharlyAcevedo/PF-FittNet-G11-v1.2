const mongoose = require('mongoose');
const Gims = require('../models/Gyms');

async function getAllGyms(){
    try {
        const response = await Gims.find()        
        return response
    }  catch (error) {
        console.log(error.message)
        return error.message
    }
}

async function getGymById(id){
    try {
        const response = await Gims.findById({ _id: id })        
        return response
    }  catch (error) {
        console.log(error.message)
        return error.message
    }
}

async function getGymByName(name){
    try {
        const response = await Gims.find(name)        
        return response
    }  catch (error) {
        console.log(error.message)
        return error.message
    }
}

async function postGyms(gym){
    try {
        const response = await Gims.create({
            name: gym.name,
            price: gym.price,
            raiting: gym.raiting,
            image: gym.image,
            address: {
                street: gym.address.street,
                floor: gym.address.floor,
                address: gym.address.address,
                apartment: gym.address.apartment,
                neighborhood: gym.address.neighborhood,
                city: gym.address.city,
                country: gym.address.country,
                zipCode: gym.address.zipCode,
            },
            services: gym.services,
            trainers: gym.trainers,
            logo: gym.logo,
            phone: gym.phone,
            email: gym.email,
            socialNetworks: gym.socialNetworks,
            gymActive: true,
        })        
        return response
    }  catch (error) {
        console.log(error.message)
        return error.message
    }
}    

async function saveGyms(Gym){
    return "todavia no hay funcion para guardar cambios al gym"
}    

module.exports = { getAllGyms, postGyms, saveGyms, getGymById, getGymByName }
