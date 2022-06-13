const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    paymentName: {
        type: String,
        required: true,
    },
    payType: [String]
});

module.exports = mongoose.model('Payment', paymentSchema);