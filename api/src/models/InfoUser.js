const mongoose = require('mongoose');
const { regWord, regEmail } = require('../controlers/regExes')

const infoUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: v => regWord.test(v),
            message: props => `${props.value} is not a valid Name`
        }
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: {
            validator: v => regEmail.test(v),
            message: props => `${props.value} is not a valid email address`
        }
    },
    phone: {
        type: String,
    },
    birthday: {
        type: Date,
    },
    gender: {
        type: String,
    },
    photo: {
        type: String,
    },
    diseases: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Diseases"
    },
    emergenciCallTo: { //contacto de emergencias
        type: String,
    },
    emergenciPhone: { //numero para emergencias
        type: Number,
    },
    address: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Address"
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
    },
})

module.exports = mongoose.model('InfoUser', infoUserSchema)
