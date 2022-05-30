const mongoose = require("mongoose");
let regMail =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
//regex para validar cualquier direccion que contenga caracteres unicode

const partnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    validate: {
      validator: (e) => regMail.test(e),
      message: (e) => `${e.value} is not a valid email address`,
    },
  },
  phone: {
    type: Number,
    // required: true,
  },
  planType: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Plan",
  },
  profileCategory: {
    type: Array,
    // required: true,
  },
  userActive: {
    type: Boolean,
    required: true,
  },
  socialNetworks: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "SocialMedia",
  },
  gyms: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Gym",
  },
  paymentMethods: {
    type: Array,
    // required: true,
  },
  category: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Category",
  },
});

module.exports = mongoose.model("Partner", partnerSchema);
