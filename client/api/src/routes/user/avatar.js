const router = require('express').Router();

const { createAvatar, getAvatar, updateAvatarForUser } = require('../../controlers/avatar.controllers');

router.post('/', createAvatar); //crea un nuevo avatar
router.get('/', getAvatar); //trae todos los avatares creados de la db
router.put('/:id', updateAvatarForUser); //edita la informacion de un avatar


module.exports = router;