const mongoose = require('mongoose');

const userPlanSchema = new mongoose.Schema({
    planName: {
        type: String,
        required: true,
    },
    services: [String],
    price: {
        type: Number,
    }
    //array de servicios, relacionar con el esquema de servicios
});

module.exports = mongoose.model('Plan', userPlanSchema);