const router = require('express').Router();

const { createAvatar, getAvatar } = require('../controlers/avatar.controllers');

router.post('/avatar', createAvatar);
router.get('/avatar', getAvatar);

module.exports = router;