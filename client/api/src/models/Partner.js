const mongoose = require("mongoose");
const { regEmail, regWord } = require('../controlers/regExes');

const partnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: v => regWord.test(v),
      message: props => `${props.value} is not a valid Name`
  }
  },
  lastName: {
    type: String,
    validate: {
      validator: v => regWord.test(v),
      message: props => `${props.value} is not a valid Name`
  }
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    validate: {
      validator: (e) => regEmail.test(e),
      message: (e) => `${e.value} is not a valid email address`,
    },
  },
  phone: {
    type: Number,
  },
  planType: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Plan",
  },
  profileCategory: {
    type: Array, //debe contener las caracteristicas asociadas de los avatares con el perfil del gym
  },
  userActive: {
    type: Boolean,
    required: true,
  },
  socialNetworks: {
    type: Array,
    of: mongoose.SchemaTypes.ObjectId,
    ref: "SocialMedia",
  },
  gyms: {
    type: Array,
    of: mongoose.SchemaTypes.ObjectId,
    ref: "Gym",
  },
  paymentMethods: {
    type: Array,
    of: mongoose.SchemaTypes.ObjectId,
    ref: "Payment",
  },
  category: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Category",
  },
});

module.exports = mongoose.model("Partner", partnerSchema);
