const router = require('express').Router();

const { googleSignIn } = require('../../controlers/users');

router.post('/google/auth', googleSignIn);


module.exports = router;