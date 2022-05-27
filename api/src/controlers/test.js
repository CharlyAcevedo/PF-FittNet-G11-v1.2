const mongoose = require('mongoose');
const User = require('../models/User')

async function run() {
    try {
        const newUser = await User.create({
            name: "Jessi",
            lastName: "Longo",
            userName: "jessilongo",
            email: "jessilongo@hotmail.com",
            password: "1234",
            type: "admin"
        })
        console.log(newUser)
        return newUser
    } catch (error) {
        console.log(error.message)
    }
}


module.exports = run
