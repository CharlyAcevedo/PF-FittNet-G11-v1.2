const router = require('express').Router();

const { googleSignIn, getUser, getUserGoogleAccount } = require('../controlers/users');

router.post('/google/auth', googleSignIn);
// router.get('/user/profile/:id', getUser);
// router.post('/user/profile', getUserGoogleAccount);


module.exports = router;