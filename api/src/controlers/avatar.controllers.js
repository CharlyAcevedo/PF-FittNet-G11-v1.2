const Avatar = require('../models/Avatar');

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


module.exports = { getAvatar, createAvatar }