const { Router } = require('express');
const routeRegister = require('./register');

// La función valida que el usuario tenga una sesión iniciada,
// de lo contrario es redirigido a / donde recibe otro mensaje.
// Esta función además protege la ruta.
function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/');
    }
}

const router = Router();

// Esta ruta está pensada para responde al pedido de infomación de todos los
// gimnasios, responde con un array que tiene un objeto por gimnasio.


router.get('/home', isAuthenticated, async (req, res) => {
    console.log(req.user, ' lo que guarda req.user' );

    res.json({ user: req.user })
  
   

});


module.exports = router;