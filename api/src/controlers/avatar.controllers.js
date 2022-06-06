const Avatar = require('../models/Avatar');
const User = require('../models/User')

const getAvatar = async (req, res) => {
    try {
        const avatar = await Avatar.find();
        res.status(200).json(avatar);
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Avatar no existe'
        })
        console.log('error: ', error)
    }
}

const createAvatar = async (req, res) => {
    try {
        const newAvatar = new Avatar(req.body);
        await newAvatar.save();
        res.status(200).json({
            ok: true,
            msg: 'Avatar creado exitosamente',
            newAvatar
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'No se pudo crear el avatar'
        })
    }
}


const updateAvatarForUser = async (req, res) => {
    const { id } = req.params;
    const { avatar } = req.body;
    try {
        console.log(id, avatar)
        const UserUpdateAvatar = await User.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )
        // const idForInfo = UserUpdateAvatar.info
        // const UserInfoUpdateAvatar = await User.findByIdAndUpdate(
        //     idForInfo,
        //     req.body,
        //     { new: true }
        // )
        res.status(200).json({
            ok: true,
            msg: "Usuario modificado correctamente",
            UserUpdateAvatar,
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "No se pudo modificar el usuario"
        })
        console.log("error: ", error)
    }
}



module.exports = { getAvatar, createAvatar, updateAvatarForUser }