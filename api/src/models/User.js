const mongoose = require('mongoose');
const mongoDB = require('mongodb');
const { regEmail, regWord } = require('../controlers/regExes')


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
    latitude: {
        type: mongoDB.Decimal128,        
    },
    longitude: {
        type: mongoDB.Decimal128,
    },
    active: {
        type: Boolean,
        required: true,
       
    },
    secretToken: {
        type: String,
        required: false,
    },      
    type: {
        type: String,
        required: true,
    },
    avatar: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Avatar",
    },
    info: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "InfoUser"
    },
    partner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Partner"
    },
    favourite: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "gyms"
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
