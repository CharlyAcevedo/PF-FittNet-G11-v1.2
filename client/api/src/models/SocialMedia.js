const mongoose = require('mongoose');

const socialMediaSchema = new mongoose.Schema({
    SocialMedia: {
        type: String,
        required: true,
    },
    userSM: String,
});

module.exports = mongoose.model('SocialMedia', socialMediaSchema);