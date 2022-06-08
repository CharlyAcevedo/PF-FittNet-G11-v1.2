const mongoose = require('mongoose');
const Gims = require('../models/Gyms');
const Address = require('../models/Address');
const Service = require('../models/Service');
const User = require('../models/User');

async function getAllGyms() {
    try {
        const response = await Gims.find({})
            .populate('address')
            .populate('services')
        return response
    } catch (error) {
        console.log(error.message)
        return error.message
    }
}

async function getGymById(id) {
    try {
        const response = await Gims.findById({ _id: id })
            .populate('address')
            .populate('services')
        return response
    } catch (error) {
        console.log(error.message)
        return error.message
    }
}

async function getGymByName(name) {
    try {
        const response = await Gims.find(name)
        return response
    } catch (error) {
        console.log(error.message)
        return error.message
    }
}

async function postGyms(gym) {
    try {
        const newAddress = new Address({
            street: gym.address.street,
            floor: gym.address.floor,
            address: gym.address.address,
            apartment: gym.address.apartment,
            neighborhood: gym.address.neighborhood,
            city: gym.address.city,
            country: gym.address.country,
            zipCode: gym.address.zipCode,
        })
        await newAddress.save();
        const addressId = newAddress._id
        const response = await Gims.create({
            name: gym.name,
            price: gym.price,
            raiting: gym.raiting,
            image: gym.image,
            latitude: gym.latitude,
            longitude: gym.longitude,
            address: addressId,
            services: gym.services,
            trainers: gym.trainers,
            logo: gym.logo,
            phone: gym.phone,
            email: gym.email,
            socialNetworks: gym.socialNetworks,
            gymActive: true,
            favourite: 0
        })
        return response
    } catch (error) {
        console.log(error.message)
        return error.message
    }
}

async function saveGyms(id, data) {

    let newServices = await data.map(s => {
        let sToPush = Service.findById({ _id: s })
        return sToPush
    })
    let gymToUpdate = await Gims.updateOne({
        _id: id
    }, {
        services: data,
    });
    let response = await Gims.findById({
        _id: id,
    })
        .populate('address')
        .populate('services')
    return response
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
