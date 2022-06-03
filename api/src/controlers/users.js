const mongoose = require('mongoose');
const { findByIdAndDelete } = require('../models/User');
const User = require('../models/User');
const InfoUser = require('../models/InfoUser');
const ObjectId = require('mongoose').Types.ObjectId;

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
        const response = await User.find({})
        .populate('avatar')
        .populate('info')
        .populate('partner')
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
            latitude: newUser.latitude,
            longitude: newUser.longitude,
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

async function deleteUser(id) {
    try {
        const userDeleted = await User.findByIdAndDelete(id)
        console.log(userDeleted)
    } catch (error) {
        console.log(error.message)
        return error.message
    }
}

const googleSignIn = async (req, res) => {
    const googleToken = req.body.tokenId
    const { email, name, given_name, family_name, picture } = req.body.data;
    const userName = email;
    try {
        const usuarioDb = await User.findOne({ userName })
        let usuario;
        if (!usuarioDb) {
            const userInfo = new InfoUser({
                name: name,
                lastName: family_name,
                email: userName,
                photo: picture,
            });
            await userInfo.save();
            const infoId = userInfo._id
            usuario = new User({
                name: given_name,
                userName: userName,
                password: "0xoaudfj203ru09dsfu2390fdsfc90sdf2dfs",
                type: "user",
                info: infoId
            });
        } else {
            usuario = usuarioDb;
        }
        await usuario.save();
        res.json({
            ok: true,
            usuario,
            googleToken
        })
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            ok: false,
            msg: "No se pudo crear el usuario"
        })
    }
}

const getUser = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const user = await User.findById(id)
        .populate('avatar')
        .populate('info')
        .populate('partner')
        console.log(user)
        res.json({
            ok: true,
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Unexpected error"
        })
    }
}

function isValidObjectId(id){
    
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}

module.exports = { findUser, findAllUsers, createUser, deleteUser, updateAvatarForUser, googleSignIn, getUser, isValidObjectId }
