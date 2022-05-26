const router = require('express').Router();

const { createAvatar, getAvatar } = require('../controlers/misc.controllers');

router.post('/avatar', createAvatar);
router.get('/avatar', getAvatar);

module.exports = router;