const mongoose = require('mongoose');
const mongoDB = require('mongodb');

const shopCartSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users",
    },
    gyms: {
        type: Array,
        of: mongoose.SchemaTypes.ObjectId,
        ref: "Gyms",
    },
    services: {
        type: Array,
        of: mongoose.SchemaTypes.ObjectId,
        ref: "Services",
    },
    quantity: {
        type: Number
    },
    price: {
        type: mongoDB.Decimal128
    },
    total: {
        type: mongoDB.Decimal128
    },
    status: {
        type: String,        
        default: "Pending"
    },
    createdAt: {
        type: Date,
        required: true,
        inmutable: true,
        default: () => Date.now(),
    },
    updatedAt: {
        type: Date,
        required: true,
        default: () => Date.now(),
    }
});

module.exports = mongoose.model('ShopCart', shopCartSchema);