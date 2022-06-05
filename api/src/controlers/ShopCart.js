const mongoose = require('mongoose');
const ShopCart = require('../models/ShopCart');
const Gyms = require('../models/Gyms')
const Service = require('../models/Service')

const getShopCart = async (req, res) => {
    try {
        const response = await ShopCart.aggregate([
            { $lookup: { from: 'gyms', localField: 'gyms', foreignField: '_id', as: 'gyms' } },
            { $unwind: { path: '$gyms', preserveNullAndEmptyArrays: true } },

            { $lookup: { from: 'user', localField: 'user', foreignField: '_id', as: 'user' } },
            { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },

            { $lookup: { from: 'services', localField: 'services', foreignField: '_id', as: 'services' } },
            { $unwind: { path: '$services', preserveNullAndEmptyArrays: true } },
            { $project: { user: 1, gyms: 1, services: 1 } }])
        console.log(response)
        res.send(response)
    } catch (error) {
        console.log(error.message)
        return error.message
    }
}

const postCart = async (req, res) => {
    const { gym, services, user } = req.body
    try {
        const newShopCart = await ShopCart.create({
            gyms: gym,
            services: services,
            user: user
        })
        console.log(gym)
        res.send(newShopCart)
    } catch (error) {
        console.log(error.message)
        return error.message
    }
}

module.exports = { getShopCart, postCart }