const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema({
    desease: {
        type: String,
        required: true,
    },
    trainlimits: {
        type: Array,
        //array de strings con los limitantes de entrenamiento o riesgos para entrenar
    }
})

module.exports = mongoose.model('Diseases', diseaseSchema)