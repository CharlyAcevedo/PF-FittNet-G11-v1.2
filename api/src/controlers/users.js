const mongoose = require('mongoose');
const User = require('../models/User');

async function findUser(userName){
    try {
        const response = await User.findOne(userName)        
        return response
    } catch (error) {
        console.log(error.message)
        return error.message
    }
}

async function findAllUsers(){
    try {
        const response = await User.find()        
        return response
    }  catch (error) {
        console.log(error.message)
        return error.message
    }
}

async function createUser(newUser) {
    try {
        const response = await User.create({
            userName: newUser.username,
            password: newUser.password,
            type: newUser.type,            
        })        
        return response
    }  catch (error) {
        console.log(error.message)
        return error.message
    }
}

// const updateUser = async(req, res) => {
//     try {
        
//     } catch (error) {
//         console.log("error: ", error)
//     }
// }

module.exports = { findUser, findAllUsers }