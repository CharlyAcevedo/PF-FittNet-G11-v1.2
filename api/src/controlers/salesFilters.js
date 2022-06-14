const mongoose = require("mongoose");
const ShopCart = require("../models/ShopCart");
const Gyms = require("../models/Gyms");
const Service = require("../models/Service");
const User = require("../models/User");

const getPartnerSales = async (id) => {
  try {
    console.log("si entro a la funcion", id)
    const partnerSales = await ShopCart.find({ gyms: id, status: "Payed" })
    .populate({
        path: "user gyms services"
    })
    return partnerSales
    // const response = await ShopCart.aggregate([
    //     { $lookup: { from: 'gyms', localField: 'gyms', foreignField: '_id', as: 'gyms' } },
    //     { $unwind: { path: '$gyms', preserveNullAndEmptyArrays: true } },

    //     { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'user' } },
    //     { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },

    //     { $lookup: { from: 'services', localField: 'services', foreignField: '_id', as: 'services' } },
    //     { $unwind: { path: '$services', preserveNullAndEmptyArrays: true } },
    //     { $project: { _id: 1, user: 1, gyms: 1, services: 1, status: 1 } }])
    // res.send(response)
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

module.exports = { getPartnerSales };
