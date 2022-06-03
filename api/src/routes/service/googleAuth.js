const router = require('express').Router();

const { googleSignIn, getUserGoogleAccount } = require('../../controlers/users');

router.post('/google/auth', googleSignIn);
router.post('/google/auth/profile', getUserGoogleAccount);


module.exports = router;