const mongoose = require('mongoose');
const mongoDB = require('mongodb');

const shopCartSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    },
    gyms: {
        type: Array,
        of: mongoose.SchemaTypes.ObjectId,
        ref: "Gym",
    },
    services: {
        type: Array,
        of: mongoose.SchemaTypes.ObjectId,
        ref: "Service",
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
    }

    //array de objetos(services) con las props nombre,detalle,precio

});

module.exports = mongoose.model('ShopCart', shopCartSchema);