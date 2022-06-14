const mongoose = require('mongoose');

const diseasesTypeSchema = new mongoose.Schema({
    deseaseName: {
        type: String,
        required: true,
    },
    
    benefits: { //beneficios del ejercicio en relacion al tipo de enfermedad
        type: String,
    },

})

module.exports = mongoose.model('DiseasesType', diseasesTypeSchema)