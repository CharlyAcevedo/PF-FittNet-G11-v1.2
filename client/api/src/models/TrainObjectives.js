const mongoose = require('mongoose');

const trainObjSchema = new mongoose.Schema({
    objective: {
        type: String,
        required: true,
    },
    type: String,
    services: {
        type: Array,
        //array de servicios, referencia al schema de servicios
    }
})

module.exports = mongoose.model('TrainObjectives', trainObjSchema)