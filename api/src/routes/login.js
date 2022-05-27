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





module.exports = router;