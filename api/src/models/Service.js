const mongoose = require("mongoose");
const mongoDB = require('mongodb');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String, 
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  price: {
    type: mongoDB.Decimal128,
    required: true,
  },
  photo: {
    type: String,
  },
  profileCategory: {
    type: Array, //debe contener las caracteristicas asociadas de los avatares con el perfil del gym
  },
});

module.exports = mongoose.model("Services", serviceSchema);
