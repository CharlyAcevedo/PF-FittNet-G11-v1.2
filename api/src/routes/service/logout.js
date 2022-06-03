const { Router } = require('express');
const router = Router();



// Esta ruta sirve para desloguear un usuario
// Cuando el usuario se deslogua, se limpian los datos de su sesión, y es
// por ahora redirigido a / dónde recibirá un mensaje como respuesta.


router.post('/logout',
  function(req, res){
    req.logout();
    // res.clearCookie('sid'); // clear session id - ver si es necesario
    res.redirect('/');
  }
);




module.exports = router;