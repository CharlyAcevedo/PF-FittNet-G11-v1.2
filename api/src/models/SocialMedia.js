const mongoose = require('mongoose');

const socialMediaSchema = new mongoose.Schema({
    SocialMedia: {
        type: String,
        required: true,
    },
    userSM: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('SocialMedia', socialMediaSchema);