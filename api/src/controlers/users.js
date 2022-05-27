const mongoose = require('mongoose');
const User = require('../models/User');

async function findUser(userName){
    try {
        const response = User.findOne(userName)        
        return response
    } catch (error) {
        console.log(error.message)
        return error.message
    }
}

async function findAllUsers(){
    try {
        const response = User.find()        
        return response
    }  catch (error) {
        console.log(error.message)
        return error.message
    }
}

async function createUser(newUser) {
    try {
        const response = User.create({
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

module.exports = { findUser, findAllUsers }