const mongoose = require('mongoose');
const { findByIdAndDelete } = require('../models/User');
const User = require('../models/User');
const InfoUser = require('../models/InfoUser');
const ObjectId = require('mongoose').Types.ObjectId;
var passport = require("passport");
// const jwt
const jwt_decode = require('jwt-decode');
const bcrypt = require('bcrypt');
const Address = require('../models/Address');

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

const getUserGoogleAccount = async (req, res) => {
    const { token } = req.body;
    const usuario = jwt_decode(token)
    console.log(req.body)
    const userName = usuario.email
    try {
        const user = await User.aggregate([
            { $match: { userName: userName } },
            {
                $lookup: {
                    from: "avatars",
                    localField: "avatar",
                    foreignField: "_id",
                    as: "avatar"
                }
            },
            {
                $unwind: {
                    path: '$avatar',
                    preserveNullAndEmptyArrays: false
                }
            },
            // {
            //     $lookup: {
            //         from: "infoUsers",
            //         localField: "info",
            //         foreignField: "_id",
            //         as: "infoUsers"
            //     }
            // },
            // {
            //     $unwind: {
            //         path: '$infoUser',
            //         preserveNullAndEmptyArrays: true
            //     }
            // },
            {
                $project: {
                    name: 1,
                    userName: 1,
                    // latitude: 0,
                    // longitude: 0,
                    active: 1,
                    secretToken: 1,
                    type: 1,
                    avatar: {
                        _id: 1,
                        avatarName: 1,
                    },
                    info: 1
                }
            }
        ]);
        console.log(user)
        return res.status(200).json({
            ok: true,
            user: user[0]
        })
        // const user = await User.findOne({ userName })
        //     .populate('avatar', 'avatarName')
        //     .populate('info', 'photo')
        // res.json({
        //     ok: true,
        //     user
        // })
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            ok: false,
            msg: "Unexpected errorf"
        })
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
        let newUser = await usuario.save();
        // console.log (newUser, 'nuevo usuario Google')
        let userId = newUser._id;

        res.json({
            ok: true,
            usuario,
            googleToken,
            userId
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

function isValidObjectId(id) {

    if (ObjectId.isValid(id)) {
        if ((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}


async function updatePassword(userId, newPassword, password, secretToken) {
    if (userId && newPassword && password && !secretToken) {
        // Entonces hablamos de una actualización de password
        // El usuario quiere actualizar su password
        // 1. Buscar el userId y validar su password (passport)
        // 2. Setearle la nueva password.

        let validation = await findUser({ _id: userId }) //busca en mongoDB el usuario
            .then((user) => {
                if (!user) {
                    return false;
                }
                if (user) {
                    // Si tengo usuario retorno una nueva promesa
                    return bcrypt.compare(password, user.password)
                        .then((res) => {
                            if (res === false) { // No hay coincidencia entre las password
                                return false;
                            }
                            if (res === true) { // Si hay coincidencia entre las password
                                // console.log(user, res, ' user en la 54');                                
                                return true;
                            }
                        })
                }
            })
            .catch((err) => {
                console.log(err);
                return done(err);
            });
        // console.log(validation, ' qué tiene validation???')
        // validation puede ser igual a false o true (en caso de que el usuario 
        // exista y su password sea correcta)

        if (validation) { // Seteo la nueva contraseña
            let salt = 8;
            // Hashear la nueva clave, buscar el user por id y stear la hashpassword
            let newHashPassword = await bcrypt.hash(newPassword, salt);
            let findAndUpdate = await User.findOneAndUpdate({ _id: userId }, { password: newHashPassword })

            if (findAndUpdate) {
                return true;
            } else {
                return false;
            }

        } else {
            return false;
        }

    }
    if (userId && newPassword && !password && secretToken) {
        // Entonces hablamos de una recuperación de password
        // 1. El usuario intente recuperar una cuenta porque se olvidó el password
        // 2. El usuario quiere actualizar su password y validar el token
        // 3. Setear la nueva password
        console.log(userId, newPassword, secretToken, '¿Qué pasaaa? 2')
        let findUserId = await findUser({ _id: userId })
        console.log(findUserId, '¿Qué pasaaa? 3')

        if (!findUserId) return "Usuario no encontrado";

        if (findUserId.secretToken !== secretToken) return "Token de recuperación incorrecto";

        let salt = 8;
        // Hashear la nueva clave, buscar el user por id y stear la hashpassword
        let newHashPassword = await bcrypt.hash(newPassword, salt);
        let findAndUpdate = await User.findOneAndUpdate({ _id: userId }, { password: newHashPassword, active: true })

        if (findAndUpdate) {
            return true;
        } else {
            return false;
        }

    }
}

const updateUser = async (req, res) => {
    const { id } = req.params
    try {
        const body = req.body
        const user = await User.findById(id)

        //? hay que condicionar para que el address no se duplique
        //? preguntar si existe ya en mi base de datos un address con ese id
        const userInfo = await InfoUser.findById(user.info)

        const address = await Address.findById(userInfo.address)

        let idAddress;
        if (!address) {
            const addressUser = new Address({
                street: body.street,
                floor: body.floor,
                address: body.address,
                apartament: body.apartament,
                neighborhood: body.neighborhood,
                city: body.city,
                country: body.country,
                zipCode: body.zipCode
            })
            await addressUser.save()
            idAddress = addressUser._id
        } else {
            const addressUser = new Address({
                street: body.street,
                floor: body.floor,
                address: body.address,
                apartament: body.apartament,
                neighborhood: body.neighborhood,
                city: body.city,
                country: body.country,
                zipCode: body.zipCode
            })
            await Address.findByIdAndUpdate(address._id, addressUser, { new: true })
            idAddress = address._id;
        }
        const idInfo = user.info
        const idAvatar = user.avatar
        const newInfoUser = {
            username: body.username,
            lastName: body.lastname,
            phone: body.phone,
            birthday: body.birthday,
            avatar: idAvatar,
            address: idAddress,
            gender: body.gender,
            photo: body.photo,
        }
        const updUser = await InfoUser.findByIdAndUpdate(idInfo, newInfoUser, { new: true })
        res.status(200).json({
            ok: true,
            updUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "no se pudo actualizar el usuario"
        })
    }
}




module.exports = { findUser, findAllUsers, createUser, deleteUser, updateAvatarForUser, googleSignIn, getUser, isValidObjectId, updatePassword, getUserGoogleAccount, updateUser }
