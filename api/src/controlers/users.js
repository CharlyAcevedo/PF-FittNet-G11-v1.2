const mongoose = require('mongoose');
const { findByIdAndDelete } = require('../models/User');
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

async function deleteUser(id){
    try{
        const userDeleted = await User.findByIdAndDelete(id)
        console.log(userDeleted)
    }  catch (error) {
        console.log(error.message)
        return error.message
    }
}

module.exports = { findUser, findAllUsers, createUser, deleteUser }
