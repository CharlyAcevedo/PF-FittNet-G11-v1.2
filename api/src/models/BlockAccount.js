const mongoose = require('mongoose');

const blockAccountSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
    },
});

module.exports = mongoose.model('BlockAccounts', blockAccountSchema);