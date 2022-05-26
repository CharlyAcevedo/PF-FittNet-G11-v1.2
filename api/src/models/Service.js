const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: Text,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  gyms: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Gym",
  },
  uEnd: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  photo: {
    type: String,
    required: true,
  },
  objTrining: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "TrainObjectives",
  },
  coach: {
    //Se deja pendiente para evaluar su uso
  },
});

module.exports = mongoose.model("Services", serviceSchema);
