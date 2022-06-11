const mongoose = require('mongoose');

const lockAccountSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
    },
});

module.exports = mongoose.model('LockAccounts', lockAccountSchema);