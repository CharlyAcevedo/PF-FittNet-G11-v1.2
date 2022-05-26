const { Router } = require('express');
const express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
const routeRegister = require('./register');
// De aquí luego tomo la "base de datos" y la consulta sobre ella


// Ojo con el orden en que están planteadas las cosas (acá el orden importa).

//------------------------------------------------------------------
// Paso 3, recibo el username y password
// Luego, busco un user con el username en mi base de datos (con una promesa)
// Si la promesa se resuelve puedo tener o no tener un user
// Si no tengo el user devuelvo en done (null como error y false como verificación)
// Si tengo el user y las contraseñas (tanto la recibida como la del user de mi bd)
// son distintas devuelvo en done (null como error y false como verificación)
// Si tengo user y coincidencia entre las contraseñas, entonces devuelvo
// en el done (null como error y el user en la verificación)
// Si la promesa es rechazada, entonces devuelvo en el done el error
//------------------------------------------------------------------
passport.use(new Strategy(  
  function(username, password, done) {
    console.log('esto entra 52');
    routeRegister.findByUsername(username)
    // Debería consultar con la base de datos de mongose DB
    // Estoy buscando un email
    .then((user) => {
        console.log(user, ' user en la 54');
        if(!user) {
          return done(null, false);
        }
        if(user.password != password) {
          return done(null, false);
        }
        return done(null, user);
      })
    .catch(err => {
      console.log(err)
      return done(err);
    })
  }));
  

// Configuración de la persistencia de la sesión autenticada
//-------------------------------------------------------------------------------
// Para recuperar los datos de la sesión autenticada Passport necesita dos métodos para
// serializar y deserializar al usuario de la sesión. Para ello la forma más práctica de hacerlo
// es serializando el ID del usuario para luego al deserealizar a partir de dicho ID obtener
// los demás datos de ese usuario. Esto permite que la información almacenada en la sesión sea
// lo más simple y pequeña posible

// Passport uses serializeUser function to persist user data (after successful 
// authentication) into session

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// Al deserealizar la información del usuario va a quedar almacenada en req.user
// Function deserializeUser is used to retrieve user data from session

passport.deserializeUser(function(id, done) {
  // Debería consultar con la base de datos de mongose DB

  routeRegister.findById(id)
  .then((user) => {
      done(null, user);
    })
    
  .catch(err => {
      return done(err);
    })
});

const router = Router();

router.use(require('morgan')('dev'));
router.use(express.urlencoded({ extended: true }));
router.use(require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));


// Inicializa Passport y recupera el estado de autenticación de la sesión.
router.use(passport.initialize());
router.use(passport.session());


// Middleware para mostrar la sesión actual en cada request
router.use((req, res, next) => {
  // console.log(req.session, ' esto es req.session 120');
  // console.log(req.user, ' esto es req.user 121');
  next();
});


router.get('/login',  (req, res) => {
    res.send('Email o contraseña incorrecta');
});


//------------------------------------------------------------------
// Paso 1, login post recibe un email y password por body (aunque 
// no se ve en el código).
// Llama primero a authenticate avisando que la estrategia es local
// y autentica.
// Si la autenticación falla manda al usuario a /api/login, y allí
// se le responderá 'Email o contraseña incorrect'.
// Si lo autenticación tiene éxito lo envia a /api/profile, dónde
// por ahora recibe como respuesta un objeto con sus datos.
// Las redirecciones se pueden cambiar según el flujo que se defina.
//------------------------------------------------------------------
// Paso 2, ver que pasa en autenticate --> passport.use(new Strategy 
//------------------------------------------------------------------

router.post('/login',
passport.authenticate('local', { failureRedirect: '/api/login' }),
function(req, res) {
  // console.log(req.session, ' esto es req.session 120');
  let id = req.user.id;
  let name = req.user.name;
  let type = req.user.type;
  console.log(req.user, ' esto es req.user 121');
  // { id: 1, name: 'Franco', email: 'Franco@mail.com', password: '1234' }
  
  // res.cookie('userId', id);

  res.json({login: true , userId: id, name: name, type: type });

  // debería enviar el cookies

});





module.exports = router;