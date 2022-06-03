const router = require("express").Router();

const { updateAvatarForUser, googleSignIn, getUser, getUserGoogleAccount, updateUser } = require('../../controlers/users');

router.put('/user/avatar/:id', updateAvatarForUser);
router.post('/google/auth', googleSignIn);
router.get('/user/profile/:id', getUser);
router.post('/user/profile', getUserGoogleAccount);
router.put('/update/:id', updateUser);

module.exports = router;