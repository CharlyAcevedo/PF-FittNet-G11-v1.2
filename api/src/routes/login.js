const { Router } = require('express');
const express = require('express');
const morgan = require('morgan');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

const cookieparser = require('cookie-parser');

const routeRegister = require('./register');


const router = Router();

router.use(cookieparser()); // veremos

router.use(morgan('dev'));

router.use(express.urlencoded({ extended: true }));



// ESTO ES DEL FRONT PARA LA PROTECCIÓN DE RUTAS
//---------------------------------------------------------------------------------
// const isNotAuthenticated = (req, res, next) => { // Hay que ver si es del front

//   // Si hay un usuario logueado redirigir a /home de lo contrario llamar a next()
//   console.log(req.cookies.userId, ' cómo van quedando las')

//   if ( req.cookies.userId ) {
//     console.log('me lo están mandando a login')
//     res.redirect('/api/login'); 
  
//   } else {
//     next();
//   }

// }

router.get('/login',  (req, res) => {
    res.send('Ya existe una sesión iniciada no puede continuar con el post')
});

//----------------------------------------------------------------------------------
// router.post('/login', isNotAuthenticated, async (req, res, next) => {
router.post('/login', async (req, res, next) => {
    console.log('está entrando este post porque el usuario no está autenticado!')
    
    console.log(req.cookies, 'me llegan cookies de entrada?');
    console.log('Las guarda el servidor o el cliente???');
    // Conclusión, las guarda el cliente.
    // Si un cliente no las tiene, no entra a /home
    // Si Franco hace una solicitud, manda cookies suyas y se le responde a él
    // Si Toni hace una solicitud, manda (otras) cookies suyas y se le responde a él
    // Funcionaaa!

    const { email , password } = req.body

    console.log(req.body);
  
    let user = [];

    if (!email || !password) {
        return res.send('campos incompletos')
    }

    if (email &&  password) {

        user = await routeRegister.findByUsername(email); // voy a buscar el email
        
        if (!user) return res.send('Email inexistente')

        
        if (user.length === 1 ) {
          // {id: 1, name: 'Franco', email: 'Franco@mail.com', password: '1234'}
          // console.log(user, 'será que se logró el cometido?');
          // Y luego debería verificar el password
          // console.log(password, ' esto es password')

          console.log(user, 'esto es lo que comparo');

          if (user[0].password !== password) {
            return res.send('La contraseña no es correcta')
                    
          }

          // console.log(user, 'será que se logró el cometido, luego del filter');            
          // veo el pass
        }

     
    }

    if (user) { // Si encuentro el user en la db
    
      console.log(user[0], 'tu user fue validado y vas a home')
      
      res.cookie('userId', user[0].id); // Hay que ver si esto también en el front

      // res.status(200).json(user);
      // console.log(req.cookies, ' cómo van quedando las (2)')
      // No las veo porque se las paso al cliente y yo no las guardo
      res.status(200).json(user);
      
      // res.redirect('/api/home'); // Hay que ver si esto es del front
      
      // res.send('tu user fue validado y vas a home');

    } else {

      res.status(200).json(user);

      // console.log('tu user no fue validado y volves a login')
      // res.redirect('/api/login'); // Hay que ver si esto es del front
      // res.send('tu user no fue validado y volves a login');
    }
})



module.exports = router;