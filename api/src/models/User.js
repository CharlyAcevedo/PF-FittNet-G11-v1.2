const mongoose = require('mongoose');
const { regEmail, regWord } = require('../controlers/regExes');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        validate: {
            validator: v => regWord.test(v),
            message: props => `${props.value} is not a valid Name`
        }
    },
    userName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        validate: {
            validator: v => regEmail.test(v),
            message: props => `${props.value} is not a valid User Name`
        }
    },
    password: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: false,
    },
    secretToken: {
        type: String,
        required: true,
    },      
    type: {
        type: String,
        required: true,
    },
    avatar: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Avatar",
        required: false,
    },
    info: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "InfoUser"
    },
    partner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Partner"
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

module.exports = mongoose.model('Users', userSchema)
