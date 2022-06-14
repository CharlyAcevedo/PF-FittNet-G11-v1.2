const { Router } = require('express');

const routeUser = require('./user/index')
const routeService = require('./service/index')
const routePartner = require('./partner/index')
const routeAdmin = require('./admin/index')
const routeShopCart = require ('./user/shopCart')
const routeStripe = require ('./user/stripe')
const routerUser1 = require('./user')

const router = Router();

router.get('/', async (req, res) => {
    try {
        res.status(200).send("Esta es la api Fittnet")
    } catch (error) {
        res.status(error.status).json({error: error.message})
    }
});

router.use('/api/user', routeUser);
router.use('/api/service', routeService);
router.use('/api/partner', routePartner);
router.use('/api/admin', routeAdmin);
router.use('/api/shopcart', routeShopCart);
router.use('/api/checkout', routeStripe);
router.use("/google", routerUser1); 


module.exports = router;
