const mongoose = require("mongoose");

const gymSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Address",
  },
  services: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Service",
  },
  trainers: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "",
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
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  socialNetworks: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "SocialMedia",
  },
  gymActive: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Gyms", gymSchema);
