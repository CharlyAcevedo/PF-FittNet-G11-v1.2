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
    const salesPerGym = [];
    let totalSales = 0;
    let salesNumber = 0;
    if(gyms.length > 0){
      for(let i = 0; i < gyms.length; i++){
        const gymSales = await ShopCart.find({ gyms: gyms[i], status: "Payed" })
        .populate({
          path: "user gyms services"
        })
        sales.push(gymSales);
      }
    };
    if(sales.length > 0){
      for(let i = 0; i < sales.length; i++){
        if(sales[i].length > 0){
          let gymCount = 0;
          let salesCountPerGym = 0;
          for(let g = 0; g < sales[i].length; g++){
            salesCountPerGym++
            if(!isNaN(sales[i][g].price)) gymCount = gymCount + parseFloat(sales[i][g].price); 
            salesNumber = salesNumber + 1;
            if(!isNaN(sales[i][g].price)) totalSales = totalSales + parseFloat(sales[i][g].price);
          }
          salesPerGym.push({gym: sales[i][0].gyms[0]._id, gymName: sales[i][0].gyms[0].name, totalSales: gymCount, salesNumber: salesCountPerGym})
          gymCount = 0;
          salesCountPerGym = 0;
        }
      }
    };
    const response = {userId: idUser, partner: partner.name, salesNumber: salesNumber, totalSales: totalSales, salesPreGym: salesPerGym};
    return response
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

module.exports = { getPartnerSales };
