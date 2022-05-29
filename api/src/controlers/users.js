const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const User = require('../models/User');
const InfoUser = require('../models/InfoUser');

async function findUser(userName) {
    try {
        const response = await User.findOne(userName)
        return response
    } catch (error) {
        console.log(error.message)
        return error.message
    }
}

async function findAllUsers() {
    try {
        const response = await User.find()
        return response
    } catch (error) {
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
    } catch (error) {
        console.log(error.message)
        return error.message
    }
}

const updateAvatarForUser = async (req, res) => {
    const { id } = req.params;
    try {
        const UserUpdateAvatar = await User.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )
        const idForInfo = UserUpdateAvatar.info
        const UserInfoUpdateAvatar = await InfoUser.findByIdAndUpdate(
            idForInfo,
            req.body,
            { new: true }
        )
        res.status(200).json({
            ok: true,
            msg: "Usuario modificado correctamente",
            UserUpdateAvatar,
            UserInfoUpdateAvatar
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "No se pudo modificar el usuario"
        })
        console.log("error: ", error)
    }
}

module.exports = { findUser, findAllUsers, updateAvatarForUser }