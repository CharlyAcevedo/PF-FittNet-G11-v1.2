const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    street: {
        type: String,        
    },
    floor: {
        type: Number,        
    },
    address: {
        type: String,        
    },
    apartment: {
        type: String,
    },
    neighborhood: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    zipCode: {
        type: Number,
    },
});

module.exports = mongoose.model('Address', addressSchema);