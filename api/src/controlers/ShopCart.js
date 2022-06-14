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
    console.log()
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
    console.log(req.body, 'esto es update stripe')
    // {
    // userId: '629ce3fb748e4a864f6c4f98',
    // serviceId: '6292c055d6ce532bbb79c133',
    // gymId: '6293ffed8ef1b21bf94b0581',
    // nameService: 'Yoga',
    // price: '500',
    // quantity: 1,
    // total: 500,
    // status: 'payed'
    //   }
    let promesas = req.body
    // for(let i = 0; i<req.body.length; i++){
    //     const updatedShopCart = ShopCart.create({
    //         user: req.body.userId[i],
    //         services: req.body.serviceId[i],
    //         gyms: req.body.gymId[i],
    //         price: req.body.price[i],
    //         quantity: req.body.quantity[i],
    //         total: req.body.total[i],
    //         status: 'Payed',
    //     })
    //     promesas.push(updatedShopCart)
    // }
    try {
        const updatedShopCart = await ShopCart.create(promesas)
        console.log(updatedShopCart, 'promesas sobre el bidet')        
        res.json(updatedShopCart)
    } catch (error) {
        console.log(error.message)
        return error.message
    }
}


module.exports = { getShopCart, postCart, updateCart }