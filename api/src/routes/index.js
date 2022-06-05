const { Router } = require('express');

const routeUser = require('./user/index')
const routeService = require('./service/index')
const routePartner = require('./partner/index')
const routeAdmin = require('./admin/index')
const routeShopCart = require ('./user/shopCart')

const router = Router();

router.get('/', async (req, res) => {
    try {
        res.status(200).send("Esta es la api Fittnet, usted no esta logeado por eso fue redirigido aqui")
    } catch (error) {
        res.status(error.status).json({error: error.message})
    }
});

router.use('/api/user', routeUser);
router.use('/api/service', routeService);
router.use('/api/partner', routePartner);
router.use('/api/admin', routeAdmin);
router.use('/api/shopcart', routeShopCart);


module.exports = router;
