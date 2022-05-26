const { Router } = require('express');
const routeLogin = require('./login');
const routeLogout = require('./logout');
const routeRegister = require('./register');



const router = Router();


router.use('/api', routeLogin);
router.use('/api', routeLogout);
router.use('/api', routeRegister);




router.get('/', (req, res) => {
    console.log('recibo el get del test')
    res.status(200).send("estoy en get de api (mi home)")
});







module.exports = router;
