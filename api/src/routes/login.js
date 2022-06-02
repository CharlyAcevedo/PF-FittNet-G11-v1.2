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
    console.log(req.user, ' esto es req.user 121');
    
    let { _id, name, type, avatar } = req.user;

    // res.cookie('userId', id);

    res.json({ login: true, userId: _id, name, type, avatar });
  
  }
);



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