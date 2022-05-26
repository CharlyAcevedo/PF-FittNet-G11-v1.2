// const { Router } = require('express');


// const router = Router();

// const users = [
//     {id: 1, name: 'Franco', email: 'Franco@mail.com', password: '1234'},
//     {id: 2, name: 'Toni', email: 'Toni@mail.com', password: '1234'}
// ]

// // ESTO ES DEL FRONT PARA LA PROTECCIÓN DE RUTAS
// // ---------------------------------------------------------------------------------
// const isAuthenticated = (req, res, next) => { // Hay que ver si es del front
    
//     // Si NO hay un usuario logueado redirigir a /login de lo contrario llamar a next()
//     if ( !req.cookies.userId ) {
//       res.redirect('/api/login'); 
    
//     } else {
//       next();
//     }
// }

// router.get('/home', isAuthenticated, (req, res) => {
//     console.log(req.cookies, ' las cookies' );
  
//     // const user = users.find(user => user.id == req.cookies.userId);
//     const user = users.filter( u => u.id === Number(req.cookies.userId))
  
//     // Completar: obtener el usuario correspondiente del array 'users' tomando como
//     // referencia el id de usuario almacenado en la cookie
//       res.send(`
//       <h1>Bienvenido ${user[0].name}</h1>
//       <h4>${user[0].email}</h4>
//       <a href='/'>Inicio</a>
//     `)
// });


// module.exports = router;