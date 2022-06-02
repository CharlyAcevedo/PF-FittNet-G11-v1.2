const router = require('express').Router();

const { updateAvatarForUser, googleSignIn, getUser } = require('../controlers/users');

router.put('/user/avatar/:id', updateAvatarForUser);
router.post('/google/auth', googleSignIn);
router.get('/user/profile/:id', getUser);


module.exports = router;