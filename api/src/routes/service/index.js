const router = require('express').Router();
const routeLogin = require('./login');
const routeLogout = require('./logout');
const routeRegister = require('./register');
const routeResetPassword = require('./updatePass');
const routeActivation = require('./activation');
const routerEmailValidate = require('./emailValidate');
const routerGoogleAuth = require('./googleAuth');
const routerPlans = require('./plans')
const routerMarketing = require('./marketing');
const routeEmails = require('./emails');
const routeMercadopago = require('../service/mercadopago')


router.use('/', routeLogin); //ruta /api/service/login get y post
router.use('/', routeLogout); //ruta /api/service/logout post
router.use('/', routeRegister); //ruta /api/service/register get y post (creacion de usuario)
router.use('/', routeResetPassword); //ruta /api/service/updatepassword post
router.use('/', routeActivation); //ruta /api/service/activation//:userId/:secretToken get y /api/service/deleteuseraccount put (solo desactiva la cuenta)
router.use('/', routerEmailValidate) //ruta /api/service/logout post
router.use('/', routerGoogleAuth) //ruta /api/service/google/auth post
router.use('/plans', routerPlans) //ruta /api/service/plans get, post, put, para ver, crear y editar los planes de partner
router.use('/', routerMarketing) //ruta /api/service/
router.use('/', routeEmails); //ruta /api/service/emails --> para enviar correos
router.use('/', routeMercadopago) //ruta api/service/mercadopago --> para MP


router.get('/', async (req, res) => {
    try {
        res.status(200).send("Ruta api/service")
    } catch (error) {
        res.status(error.status).json({error: error.message})
    }
});

module.exports = router;