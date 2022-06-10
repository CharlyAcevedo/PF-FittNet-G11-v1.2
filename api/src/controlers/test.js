const mongoose = require('mongoose');
const Diseases = require('../models/Diseases')

/* async function run() {
    try {
        const newUser = await Diseases.create(
        {
            desease: "cancer",
            trainlimits: "Caminar",
            considerations: "La presencia de cetonas.",
            //email: "charlyacevedadasdsadsado@hotmail.com", 
            // address: {
            //     street: "calle 20",
            //     city: "mexico"
            // }           
        },
        )
        return newUser
        console.log(newUser)
    } catch (error) {
        console.log(error.message)
    }
} */

async function run(id) {
    try {
        const deleteDesease = await Diseases.findByIdAndDelete(id)
        console.log(deleteDesease)
    } catch (error) {
        console.log(error.message)
        return error.message
    }
}


module.exports = run
