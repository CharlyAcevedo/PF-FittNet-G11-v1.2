const mongoose = require('mongoose');
const User = require('../models/User')

async function run() {
    try {
        const newUser = await User.create({
            name: "Prueba",
            lastName: "rueba2",
            userName: "charlyaedoaaaaa",
            email: "charlyacevedadasdsadsado@hotmail.com", 
            // address: {
            //     street: "calle 20",
            //     city: "mexico"
            // }           
        })
        return newUser
    } catch (error) {
        console.log(error.message)
    }
}


module.exports = run
