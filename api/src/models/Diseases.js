const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema({
    desease: {
        type: Array,
        of: mongoose.SchemaTypes.ObjectId, 
        required: true,
    },
    trainlimits: { //limitantes de entrenamiento
        type: String,
    },
    considerations: { //consideraciones especiales
        type: String,        
    },
})

module.exports = mongoose.model('Diseases', diseaseSchema)