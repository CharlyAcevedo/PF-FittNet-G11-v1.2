const { Router } = require('express');
const routeRegister = require('./register');
const cookieparser = require('cookie-parser');

const router = Router();

// const { Router } = require('express');

// const router = Router();


// ESTO ES PARA LA PROTECCIÓN DE RUTAS
// ---------------------------------------------------------------------------------
const isAuthenticated = (req, res, next) => { // Hay que ver si es del front
    console.log(req.cookies.userId, ' Hay cookies?')
    // Si NO hay un usuario logueado redirigir a /login de lo contrario llamar a next()
    if ( !req.cookies.userId ) {
        res.redirect('/api');
        
    } else {
        // ese userId que es un id, está en nuetras base de datos?
        // Si es así, next
        next();
    }
}


    

// res.send('tu user fue validado y vas a home');
router.use(cookieparser()); // veremos

router.get('/home', isAuthenticated, async (req, res) => {
    console.log(req.cookies, ' las cookies' );
    // por cookies voy a tener el id del usario
    // { userId: '1' }  las cookies
    let id = req.cookies.userId;
    console.log(id, ' el id que envio')

    user = await routeRegister.findById(id);

    console.log(user, 'se cumplió la promesa')

    if (user.length === 1) { // si tengo el user
        console.log('ya tengo el user por la id')
        // ejemplo [{id: 1, name: 'Franco', email: 'Franco@mail.com', password: '1234'}]
        // referencia el id de usuario almacenado en la cookie
        
        res.send(`El usuario ${user[0].name} ha sido validado y puede permanecer /api/home`)
        
    } else { // si no lo tengo
        console.lgo("El usuario no ha sido validado y será redireccionado /api");
        res.redirect('/api');
    }
    
    // res.cookie('userId', ""); 
    // res.clearCookie('userId');
    
    // A final de la respuesta tengo que limpiar las cookies 
  
    // Completar: obtener el usuario correspondiente del array 'users' tomando como

});


module.exports = router;