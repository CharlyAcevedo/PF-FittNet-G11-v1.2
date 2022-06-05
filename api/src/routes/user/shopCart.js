const router = require("express").Router();
const {getShopCart, postCart} = require ('../../controlers/ShopCart')


router.get('/', getShopCart)
router.post('/', postCart)


module.exports = router;
