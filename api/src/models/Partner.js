const mongoose = require("mongoose");
const { regEmail, regWord, regCBU, regCUIL } = require('../controlers/regExes');

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
  cbu: {
    type: String,
    validate: {
      validator: (e) => regCBU.test(e),
      message: (e) => `${e.value} is not a valid CBU`,
    },
  },
  cuil: {
    type: String,
    validate: {
      validator: (e) => regCUIL.test(e),
      message: (e) => `${e.value} is not a valid CUIL`,
    },
  },
  socialNetworks: {
    type: Array,
    of: mongoose.SchemaTypes.ObjectId,
    ref: "SocialMedia",
  },
  gyms: {
    type: Array,
    of: mongoose.SchemaTypes.ObjectId,
    ref: "Gyms",
  },
  category: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Category",
  },
  userActive: {
    type: Boolean,
  },
  paymentMethods: {
    type: Array,
    of: mongoose.SchemaTypes.ObjectId,
    ref: "PaymentType",
  },
  paidOut: {
    type: Boolean,
  },
  status:{
    type: String,
    enum: ["Pending", "Payed", "Canceled"],
    default: "Pending"
  },
  incomes: {
    type: Array,
    of: mongoose.SchemaTypes.ObjectId,
    ref: "ShopCart"
  },
  payments: {
    type: Array,
    of: mongoose.SchemaTypes.ObjectId,
    ref: "Payments"
  }
});

module.exports = mongoose.model("Partner", partnerSchema);
