const router = require("express").Router();
const {getShopCart, postCart, updateCart} = require ('../../controlers/ShopCart')


router.get('/', getShopCart)
router.post('/', postCart)
router.put('/', updateCart)


module.exports = router;
