const router = require('express').Router();

const { createAvatar, getAvatar } = require('../../controlers/avatar.controllers');
const { updateAvatarForUser } = require('../../controlers/users');

router.post('/', createAvatar); //crea un nuevo avatar
router.get('/', getAvatar); //trae todos los avatares creados de la db
router.put('/:id', updateAvatarForUser); //


module.exports = router;