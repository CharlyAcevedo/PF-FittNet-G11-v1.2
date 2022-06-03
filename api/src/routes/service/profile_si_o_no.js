const { Router } = require('express');
const router = Router();

// Función validadora que puede ser exportada, falta ver si usamos esta o la
// que nos provee passport

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/');
    }
}
  
//----------------------------------------------------------------------------
// Esta ruta está pesada para responder a solicitudes de información que
// realicen los usuarios finales, los clientes empresa, y posiblemente
// los admins. 
// La ruta está protegida y verificada con passport y solo
// es posible acceder a ella si el usuario está autenticado. 
//
// Ponele que llega un objeto ---> {id: "uuid"}
// Puede ser un uuid
//-----------------------------------------------------------------------------


router.get('/profile', function(req, res) {
  let { userId } = req.body; 
  if (userId) {
    // Si tengo userId (uuid) buscar a la base de datos info relacionada con el id
    // Si la encuentro debo devolver un objeto con propiedades que quiera mostrar
    // en el detalle del usuario final, cliente empresa o admin.
    // La info que voy a recibir va a variar en estructua y contedido para cada caso.
    
  }

  res.status(200).json()
})



// Dejo comentada esta ruta protegida hasta que esté todo funcionando
// es la misma ruta anterior pero con autenticación
// router.get('/profile',
//     isAuthenticated,
//     function(req, res){
//       res.json({ user: req.user });
// });

module.exports = router;  