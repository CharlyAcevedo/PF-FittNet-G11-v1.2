const router = require('express').Router();

const { updateAvatarForUser } = require('../controlers/users');

router.put('/user/avatar/:id', updateAvatarForUser);

module.exports = router;