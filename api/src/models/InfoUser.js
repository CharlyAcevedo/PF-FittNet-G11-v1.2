const mongoose = require('mongoose');
let regWord = /^[a-zA-Z0-9]{5}[a-zA-Z0-9]*\s*\w*/;
// let regMail = /^[A-Z0-9a-z._%+-]{2}+@[A-Za-z0-9.-]{2}[A-Za-z0-9.-]*+\\.[A-Za-z]{2,64}/;

const infoUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: {
            validator: v => regWord.test(v),
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
    active: {
        type: Boolean,
    },
    address: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Address"
    },
    avatar: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Avatar"
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
