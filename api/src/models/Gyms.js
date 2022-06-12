const mongoose = require("mongoose");
const mongoDB = require('mongodb')

const gymSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: mongoDB.Decimal128,
  },
  raiting: {
    type: Number,
    enum: [1,2,3,4,5]
  },
  image: {
    type: Array,
    of: String,
  },
  latitude: {
      type: mongoDB.Decimal128,        
  },
  longitude: {
      type: mongoDB.Decimal128,
  },  
  address: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Address",
  },
  services: {
    type: Array,
    of: mongoose.SchemaTypes.ObjectId,
    ref: "Services",
  },
  trainers: {
    type: Array,
    of: String,
    // ref: "Users",
  },
  logo: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,   
  },
  uEnd: {
    type: Array,
    of: mongoose.SchemaTypes.ObjectId,
    ref: "Users",
  },
  socialNetworks: {
    type: Array,
    of: mongoose.SchemaTypes.ObjectId,
    ref: "SocialMedia",
  },
  gymActive: {
    type: Boolean,   
    default: true,
  },
  favourite: {
    type: Number,
  }
});

module.exports = mongoose.model("Gyms", gymSchema);
