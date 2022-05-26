const { Router } = require('express');
const express = require('express');
const morgan = require('morgan');
const cookieparser = require('cookie-parser');

const routeRegister = require('./register');


const router = Router();

router.use(cookieparser()); // veremos

router.use(morgan('dev'));

router.use(express.urlencoded({ extended: true }));



// ESTO ES DEL FRONT PARA LA PROTECCIÓN DE RUTAS
//---------------------------------------------------------------------------------
const isNotAuthenticated = (req, res, next) => { // Hay que ver si es del front

  // Si hay un usuario logueado redirigir a /home de lo contrario llamar a next()

  if ( req.cookies.userId ) {
    res.redirect('/home'); 
  
  } else {
    next();
  }

}

router.get('/login', isNotAuthenticated, (req, res) => {
    res.send('No hay sesión iniciada, puede continuar con el post')
});

//----------------------------------------------------------------------------------

router.post('/login', async (req, res, next) => {
    console.log('está entrando un post mierda!')

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
    
      console.log('tu user fue validado y vas a home')
      res.status(200).json(user);
      // res.cookie('userId', user[0].id); // Hay que ver si esto es del front
      // res.redirect('/home'); // Hay que ver si esto es del front
      // res.send('tu user fue validado y vas a home');

    } else {

      res.status(200).json(user);

      // console.log('tu user no fue validado y volves a login')
      // res.redirect('/api/login'); // Hay que ver si esto es del front
      // res.send('tu user no fue validado y volves a login');
    }
})



module.exports = router;