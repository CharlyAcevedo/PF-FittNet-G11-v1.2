const mongoose = require('mongoose');

const avatarSchema = new mongoose.Schema({
    avatarName: {
        type: String,
        required: true,
    },
    avatarImage: {
        type: String,
        required: true,
    },
    features: {
        type: Array,
        of: String,
    }
});

module.exports = mongoose.model('Avatar', avatarSchema);