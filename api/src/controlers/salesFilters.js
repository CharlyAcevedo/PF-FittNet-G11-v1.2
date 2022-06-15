const mongoose = require("mongoose");
const ShopCart = require("../models/ShopCart");
const Gyms = require("../models/Gyms");
const Service = require("../models/Service");
const User = require("../models/User");
const Partner = require("../models/Partner");

const getPartnerSales = async (idUser) => {
  try {
    console.log("si entro a la funcion", idUser);
    const userPartner = await User.findById(idUser);
    const partner = await Partner.findById(userPartner.partner);
    const gyms = partner.gyms
    const sales = [];
    if(gyms.length > 0){
      for(let i = 0; i < gyms.length; i++){
        const gymSales = await ShopCart.find({ gyms: gyms[i], status: "Payed" })
        .populate({
          path: "user gyms services"
        })
        sales.push(gymSales);
      }
    }
    // const partnerSales = await ShopCart.find({ gyms: id, status: "Payed" })
    // .populate({
    //     path: "user gyms services"
    // })
    return sales
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
