const mongoose = require('mongoose');

const userPlanSchema = new mongoose.Schema({
    planName: {
        type: String,
        required: true,
    },
    services: [String],
    price: {
        type: String,        
    },
    commission: {
        type: String,
    },
    gymsPermited: {
        type: Number,
    },
    servicePerGym: {
        type: Number,
    }
    
});

module.exports = mongoose.model('Plan', userPlanSchema);