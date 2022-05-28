const { Router } = require("express");
const express = require("express");
var passport = require("passport");
var Strategy = require("passport-local").Strategy;
const routeRegister = require("./register");
const router = Router();

router.post(
  "/login",
  passport.authenticate("local", { 
    failureRedirect: "/api/login" 
  }),
  function (req, res) {
    // console.log(req.session, " esto es req.session 120");
    let _id = req.user._id;
    let name = req.user.name;
    let type = req.user.type;
    // console.log(req.user, " esto es req.user 121");

    // res.cookie('userId', id);

    res.json({ login: true, userId: _id, name: name, type: type });

    // debería enviar el cookies
  }
);

// Middleware para mostrar la sesión actual en cada request
// router.use((req, res, next) => {
//   // console.log(req.session, ' esto es req.session 120');
//   // console.log(req.user, ' esto es req.user 121');
//   next();
// });


// router.get('/login',  (req, res) => {
//     res.send('Email o contraseña incorrecta');
// });


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
  
  let { id, name, type, avatar } = req.user;
  // { id: 1, name: 'Franco', email: 'Franco@mail.com', password: '1234' }
  // avatar puede ver o no  
  console.log(req.user, ' esto es req.user 121');
 
  res.json({login: true , userId: id, name: name, type: type, avatar: avatar });

});





module.exports = router;