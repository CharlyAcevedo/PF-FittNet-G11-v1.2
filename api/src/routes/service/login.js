const { Router } = require("express");
const express = require("express");
var passport = require("passport");
var Strategy = require("passport-local").Strategy;
const routeRegister = require("./register");
const router = Router();

router.post(
  "/login",
  passport.authenticate("local", { 
    failureRedirect: "/api/service/login" 
  }),
  function (req, res) {
   // console.log(req.session, " esto es req.session 120");
   // console.log(req.user, ' esto es req.user 121');
    
   res.redirect('/api/service/authenticated');
   
  }
  );
  
  router.get('/authenticated',  (req, res) => {
    console.log(req.session, ' esto es req.session autenticado');
    console.log(req.user, ' esto es req.user autenticado');
    console.log(req.cookies,' esto es req.cookies autenticado');
    console.log(req.signedCookies,' esto es req.signedCookies autenticado');

    let { _id, name, type, avatar, active } = req.user;
 
    res.json({ login: true, userId: _id, name, type, avatar, active })

});

router.get('/login',  (req, res) => {
    res.send('Email o contraseña incorrecta');
});


// Middleware para mostrar la sesión actual en cada request
router.use((req, res, next) => {
  // console.log(req.session, ' esto es req.session 120');
  // console.log(req.user, ' esto es req.user 121');
  next();
});  



module.exports = router;