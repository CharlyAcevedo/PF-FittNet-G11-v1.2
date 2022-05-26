const { Router } = require('express');
const routeLogin = require('./login');
const routeLogout = require('./logout');
const routeRegister = require('./register');
const routeHome = require('./home');


const router = Router();


router.use('/api', routeLogin);
router.use('/api', routeLogout);
router.use('/api', routeRegister);
router.use('/api', routeHome);

// Rutas creadas
// 0. Barra y barra api responde cuando un usuario no fue validado o 
//    cuando un usuario que se registó se desloguea
// 1. Barra api barra login permite al usuario loguearse
// 2. Barra api barra logout permite al usuario desloguarse
// 3. Barra api barra register debe permitir a un usuario no registrado crear una
//    cuenta simplificada (id, name, email, password, tipo de cliente)
// 5. Barra api barra home debería devolver la info de las cards

// Rutas pendientes
// barra api barra profile debería devolver la info del perfil del usuario
// 
//

router.get('/', (req, res) => {
    console.log('fue redirigido a barra')
    res.status(200).send("ahora estás en /  (barra)")
});


router.get('/api', (req, res) => {
    console.log('fue redirigido a barra api')
    res.status(200).send("ahora estás en /api  (barra api), has salido")
});






module.exports = router;
