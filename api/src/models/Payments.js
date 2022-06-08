const mongoose = require('mongoose');
const mongoDB = require('mongodb');

const paymentSchema = new mongoose.Schema({
    partner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Partners",
        required: true,
    },
    description: {
        type: String,
    },
    amount: {
        type: mongoDB.Decimal128,
        required: true,
    },
    payDate: {
        type: Date,
        required: true,
        inmutable: true,
        default: () => Date.now(),
    },
    updatedAt: {
        type: Date,
        required: true,
        default: () => Date.now(),
    },
});

module.exports = mongoose.model('Payment', paymentSchema);