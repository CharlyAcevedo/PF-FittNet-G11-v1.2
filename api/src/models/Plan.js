const mongoose = require('mongoose');

const mongoDB = require("mongodb")
 

const userPlanSchema = new mongoose.Schema({
    planName: {
        type: String,
        required: true,
    },
    services: [String],
    price: {
        type: mongoDB.Decimal128,        
    },
    commission: {
        type: mongoDB.Decimal128,
    },
    gymsPermited: {
        type: Number,
    },
    servicePerGym: {
        type: Number,
    }
    
});

module.exports = mongoose.model('Plan', userPlanSchema);