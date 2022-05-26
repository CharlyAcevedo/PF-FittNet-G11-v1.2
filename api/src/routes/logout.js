const { Router } = require('express');

const cookieparser = require('cookie-parser');
const router = Router();
router.use(cookieparser()); // veremos

router.post('/logout', (req, res, next) => {
    // console.log('recibo el post / logout')
    // res.status(200).send("estoy en post de api/logout")
    // console.log(req.cookies, 'las cookies en logout'); 
    // Para ver si están viajando las cookies

    res.clearCookie('userId');
    res.redirect('/');
        
    console.log('cerraste sesión y vas a barra, por eso responde estoy en get de api');

})



module.exports = router;