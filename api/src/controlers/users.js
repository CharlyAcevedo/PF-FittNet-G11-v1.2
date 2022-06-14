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
const Diseases = require('../models/Diseases')
const DiseasesType = require('../models/DiseasesType')

async function findUser(userName) {
    try {
        const response = await User.findOne(userName)
            .populate('avatar')
            .populate('info')
            .populate('partner')
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

const getUserDetails = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id)
        .populate('avatar')
        .populate('favourite')

    const infoUser = await InfoUser.findById(user.info)
        .populate('diseases')
        .populate('disease')
        .populate('address')

    res.json({
        ok: true,
        user,
        infoUser
    })
}

const getUser = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const user = await User.aggregate([
            {
                $match: { _id: ObjectId(id) }
            },
            {
                $lookup: {
                    from: "avatars",
                    localField: "avatar",
                    foreignField: "_id",
                    as: "avatar"
                }
            },
            {
                $lookup: {
                    from: "infousers",
                    localField: "info",
                    foreignField: "_id",
                    as: "info"
                },
            },
            {
                $lookup: {
                    from: "addresses",
                    localField: "info.address",
                    foreignField: "_id",
                    as: "address"
                }
            },
            {
                $lookup: {
                    from: "partners",
                    localField: "partner",
                    foreignField: "_id",
                    as: "partner"
                }
            },
            {
                $lookup: {
                    from: "diseases",
                    localField: "info.diseases",
                    foreignField: "_id",
                    as: "info.diseases"
                }
            },
            {
                $unwind: {
                    path: "$info.diseases",
                    preserveNullAndEmptyArrays: true
                }
            },
            /* {
                $lookup: {
                    from: "diseasestypes",
                    localField: "info.diseases.desease",
                    foreignField: "_id",
                    as: "info.diseases"

                }
            },
            {
                $unwind: {
                    path: "$info.diseases.desease",
                    preserveNullAndEmptyArrays: true
                }
            }, */
            {
                $lookup: {
                    from: "diseasestypes",
                    localField: "info.diseases.desease",
                    foreignField: "_id",
                    as: "info.diseases.desease"
                }
            },
            {
                $unwind: {
                    path: "$info.diseases.desease",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    name: 1,
                    userName: 1,
                    latitude: 1,
                    longitude: 1,
                    active: 1,
                    secretToken: 1,
                    type: 1,
                    avatar: {
                        _id: 1,
                        avatarName: 1,
                    },
                    info: {
                        _id: 1,
                        name: 1,
                        lastName: 1,
                        photo: 1,
                        birthday: 1,
                        phone: 1,
                        username: 1,
                        address: {
                            _id: 1,
                            street: 1,
                        },
                        diseases: 1
                        /*  {
                            desease: 1,
                            trainlimits: 1,
                            considerations: 1 
                        }*/
                    }
                }
            }
        ])
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

/* const updateUser = async (req, res) => {
    const { id } = req.params
    try {
        const body = req.body


        const dataDesease = body.desease
        const user = await User.findById(id)
        const allDesease = user.desease
        const igualesDeseases = allDesease.filter(x => dataDesease.some(y => y.desease === x.desease));
        const desigualesDesease = dataDesease.filter(x => !allDesease.some(y => y.desease === x.desease));

    } catch (error) {
        
    }
       
} */
const updateUser = async (req, res) => {
    const { id } = req.params
    try {
        const body = req.body

        const dataDesease = body.desease //! enfermedades body
        console.log(dataDesease)

        const findDesTypes = await DiseasesType.find()
        const fil = findDesTypes.filter(e => dataDesease.includes(e.deseaseName))
        const deseaseId = fil.map(x => x._id);
        console.log("mfil", fil)
        console.log("deseaseId", deseaseId)
        console.log("findDesTypes", findDesTypes)
        // const allDesease = await Diseases.find();
        // const igualesDeseases = allDesease.filter(x => dataDesease.some(y => y.desease === x.desease));
        // const desigualesDesease = dataDesease.filter(x => !allDesease.some(y => y.desease === x.desease));

        // let finallyDesease = []
        // let idDesiguales = []
        // if (desigualesDesease.length > 0) {
        //     idDesiguales = finallyDesease.map(x => x._id);
        // }
        //const diseasesType = await

        /* finallyDesease = await Diseases.create(dataDesease)

        const idDesease = finallyDesease.map(x => x._id); */

        // const concatDesease = [...igualesDeseases.map(x => x._id), ...idDesiguales]
        const newDiseasesUser = {
            desease: deseaseId,
            trainlimits: body.trainlimits,
            considerations: body.considerations
        }
        console.log("newDiseasesUser", newDiseasesUser)

        finallyDesease = await Diseases.create(newDiseasesUser)
        console.log("finallyDesease", finallyDesease)

        const newAddressUser = {
            street: body.street,
            floor: body.floor,
            address: body.address,
            apartament: body.apartament,
            neighborhood: body.neighborhood,
            city: body.city,
            country: body.country,
            zipCode: body.zipCode
        }
        const user = await User.findById(id)



        const idInfo = user.info
        const idAvatar = user.avatar
        const infoUsuario = await InfoUser.findById(idInfo);

        let idAddress = infoUsuario.address ? infoUsuario.address : null

        if (idAddress === null) {
            console.log("estoy en crear una nueva direccion")
            const addressUser = new Address(newAddressUser)
            await addressUser.save()
            idAddress = addressUser._id
        } else {
            console.log("estoy en editar un nueva direccion")
            await Address.findByIdAndUpdate(idAddress, newAddressUser, { new: true })
        }

        const newInfoUser = {
            username: body.username,
            lastName: body.lastname,
            phone: body.phone,
            birthday: body.birthday,
            avatar: idAvatar,
            address: idAddress,
            // diseases: concatDesease,
            diseases: finallyDesease._id,
            gender: body.gender,
            photo: body.photo,
        }

        const updUser = await InfoUser.findByIdAndUpdate(idInfo, newInfoUser, { new: true })
        .populate("address");
        

        // const userInfo = await User.findById(updUser._id)
        // .populate("info")
        // .populate("address")

        res.status(200).json({
            ok: true,
            updUser,
            msg: "se creo correctamente"
        })
    } catch (error) {
        console.log(error, "no se creo")
        res.status(500).json({
            ok: false,
            msg: "no se pudo actualizar el usuario"
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

const getUserGoogleAccount = async (req, res) => {
    const { token } = req.body;
    const usuario = jwt_decode(token)
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
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "infousers",
                    localField: "info",
                    foreignField: "_id",
                    as: "info"
                }
            },
            {
                $unwind: {
                    path: '$info',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "addresses",
                    localField: "info.address",
                    foreignField: "_id",
                    as: "info.address"
                }
            },
            {
                $unwind: {
                    path: "$info.address",
                }
            },
            {
                $project: {
                    name: 1,
                    userName: 1,
                    latitud: 1,
                    longitude: 1,
                    info: {
                        name: 1,
                        photo: 1,
                        lastName: 1,
                        address: 1,
                        phone: 1,
                        gender: 1,
                        birthday: 1
                    },
                    // info: {
                    //     name: 1,
                    //     lastName: 1,
                    //     address: 1
                    // },
                    favourite: 1,
                    type: 1,
                    avatar: 1
                }
            }
            // {
            //     $lookup: {
            //         from: "infousers",
            //         localField: "info",
            //         foreignField: "_id",
            //         as: "info"
            //     }
            // },
            // {
            //     $unwind: {
            //         path: '$info',
            //         preserveNullAndEmptyArrays: true
            //     }
            // },
            // {
            //     $lookup: {
            //         from: "addresses",
            //         localField: "info.address",
            //         foreignField: "_id",
            //         as: "info.address"
            //     }
            // },
            // {
            //     $unwind: {
            //         path: "$info.address",
            //     }
            // },
            // {
            //     $lookup: {
            //         from: "diseases",
            //         localField: "info.diseases",
            //         foreignField: "_id",
            //         as: "info.diseases"
            //     }
            // },
            // {
            //     $unwind: {
            //         path: "$info.diseases",
            //         preserveNullAndEmptyArrays: true
            //     }
            // },
            // {
            //     $lookup: {
            //         from: "diseasestypes",
            //         localField: "info.diseases.desease",
            //         foreignField: "_id",
            //         as: "info.diseases.desease"
            //     }
            // },
            // {
            //     $unwind: {
            //         path: "$info.diseases.desease",
            //         preserveNullAndEmptyArrays: true
            //     }
            // },
            // {
            //     $project: {
            //         name: 1,
            //         userName: 1,
            //         // latitude: 1,
            //         // longitude: 1,
            //         active: 1,
            //         favourite: 1,
            //         secretToken: 1,
            //         type: 1,
            //         avatar: {
            //             _id: 1,
            //             avatarName: 1,
            //         },
            //         info: {
            //             _id: 1,
            //             name: 1,
            //             lastName: 1,
            //             gender: 1,
            //             photo: 1,
            //             birthday: 1,
            //             phone: 1,
            //             username: 1,
            //             address: {
            //                 _id: 1,
            //                 street: 1,
            //                 floor: 1,
            //                 neighborhood: 1,
            //                 apartament: 1,
            //                 zipCode: 1,
            //                 address: 1,
            //                 city: 1,
            //                 country: 1,
            //             },
            //             diseases: {
            //                 considerations: 1,
            //                 desease: 1,
            //                 trainlimits: 1,
            //             },
            //         }
            //     }
            // }
        ]);
        console.log("ESTOS SON MIS DATOS", user)
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
        // console.log("error: ", error);
        res.status(500).json({
            ok: false,
            msg: "Unexpected error"
        })
    }
}

const googleSignIn = async (req, res) => {
    const googleToken = req.body.tokenId
    const { email, name, given_name, family_name, picture } = req.body.data;
    console.log(req.body)
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
                active: true,
                // partner: 0,
                info: infoId
            });
        } else {
            usuario = usuarioDb;
        }
        let newUser = await usuario.save();

        console.log(newUser);

        let user = {
            userId: newUser._id, avatar: newUser.avatar, type: newUser.type,
            latitude: newUser.latitude, longitude: newUser.longitude
        };


        res.json({
            ok: true,
            usuario,
            googleToken,
            user
        })
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            ok: false,
            msg: "No se pudo crear el usuario"
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



module.exports = {
    findUser,
    findAllUsers,
    getUser,
    deleteUser,
    updateUser,
    updatePassword,
    googleSignIn,
    isValidObjectId,
    getUserGoogleAccount,
};
