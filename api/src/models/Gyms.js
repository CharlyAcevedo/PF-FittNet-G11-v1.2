const mongoose = require("mongoose");

const gymSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  raiting: {
    type: Number,
    enum: [1,2,3,4,5]
  },
  image: {
    type: Array,
    of: String,
  },
  address: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Address", //! address del gimnasio, pero direcciones tanto de gym como de user comun se guardan en la misma coleccion ?
  },
  services: {
    type: Array,
    of: mongoose.SchemaTypes.ObjectId,
    ref: "Service",
  },
  trainers: {
    type: Array,
    of: mongoose.SchemaTypes.ObjectId,
    ref: "Users",
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
    required: true,
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
    required: true,
  },
});

module.exports = mongoose.model("Gyms", gymSchema);
