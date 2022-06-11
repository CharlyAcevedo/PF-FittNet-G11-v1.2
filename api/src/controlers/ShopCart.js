const mongoose = require('mongoose');
const ShopCart = require('../models/ShopCart');
const Gyms = require('../models/Gyms')
const Service = require('../models/Service')

const getShopCart = async (req, res) => {
    try {
        
        const response = await ShopCart.aggregate([            
            { $lookup: { from: 'gyms', localField: 'gyms', foreignField: '_id', as: 'gyms' } },
            { $unwind: { path: '$gyms', preserveNullAndEmptyArrays: true } },

            { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'user' } },
            { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },

            { $lookup: { from: 'services', localField: 'services', foreignField: '_id', as: 'services' } },
            { $unwind: { path: '$services', preserveNullAndEmptyArrays: true } },
            { $project: { _id: 1, user: 1, gyms: 1, services: 1, status: 1 } }])
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
        res.send(newShopCart)
    } catch (error) {
        console.log(error.message)
        return error.message
    }
}

const updateCart = async (req, res) => {
    const { status, id, price, quantity, total } = req.body
    try {
        const updatedShopCart = await ShopCart.findByIdAndUpdate(id, {
            status: status,
            price: price,
            quantity: quantity,
            total: total
        })
        console.log(id)
        res.send(updatedShopCart)
    } catch (error) {
        console.log(error.message)
        return error.message
    }
}


module.exports = { getShopCart, postCart, updateCart }