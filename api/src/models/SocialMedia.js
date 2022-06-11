const mongoose = require('mongoose');

const socialMediaSchema = new mongoose.Schema({
    socialMedia: {
        type: String,
        required: true,
    },
    userSM: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('SocialMedia', socialMediaSchema);