const { Router } = require('express');
const router = Router();

// Esta función podría ser llevada a otro archivo pero habria que 
// realizar las pruebas de funcionamiento para asegurarnos que funcione
// todo si se modulariza.

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/');
    }
}  

// Esta ruta está pesada para responder a solicitudes de información que
// realicen los usuarios finales, los clientes empresa, y posiblemente
// los admins. 
// La ruta está protegida y verificada con passport y solo
// es posible acceder a ella si el usuario está autenticado. 




router.get('/profile',
    isAuthenticated,
    function(req, res){
      res.json({ user: req.user });
});




module.exports = router;  