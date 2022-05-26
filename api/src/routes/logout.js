const { Router } = require('express');

const cookieparser = require('cookie-parser');
const router = Router();
router.use(cookieparser()); // veremos


const isAuthenticated = (req, res, next) => { // Hay que ver si es del front

    // Si hay un usuario logueado redirigir a /home de lo contrario llamar a next()
  
    if ( !req.cookies.userId ) {
      res.redirect('/api/logout'); 
    
    } else {
      next();
    }
  
  }


router.get('/logout', (req, res, next) => {
    res.send('No hay ninguna sesión iniciada')
})

router.post('/logout', isAuthenticated, (req, res, next) => {

    console.log('recibo el post / logout y cierro la sesión')
    
    // console.log(req.cookies, 'las cookies en logout');
    // { userId: '1' } las cookies en logout   

    res.clearCookie('userId');
    res.redirect('/');
        
    console.log('cerraste sesión y vas a barra, por eso responde estoy en get de api');

})



module.exports = router;