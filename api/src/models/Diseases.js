const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema({
    desease: {
        type: String,
        required: true,
    },
    trainlimits: {
        type: String,
    },
    considerations: {
        type: String,        
    },
    emergenciCallTo: {
        type: String,
    },
    emergenciPhone: {
        type: Number,
    }
})

module.exports = mongoose.model('Diseases', diseaseSchema)