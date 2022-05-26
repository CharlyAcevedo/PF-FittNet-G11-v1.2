const mongoose = require('mongoose');
const User = require('../models/User')

async function run() {
    try {
        const newUser = await User.create({
            name: "Alberto",
            lastName: "Acevedo",
            userName: "charlyacevedo",
            email: "charlyacevedo@hotmail.com", 
            address: {
                street: "calle 20",
                city: "mexico"
            }           
        })
        console.log(newUser)
    } catch (error) {
        console.log(error.message)
    }
}


module.exports = run
