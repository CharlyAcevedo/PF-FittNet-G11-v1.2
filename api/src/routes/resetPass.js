const { Router } = require('express');
const Users = require('../models/User')

// const cookieparser = require('cookie-parser');
const router = Router();

// uso esta ruta para borrar la contraseña
// podría reutilizar esta ruta para cambiar la contraseña
// para lo segundo debería recibir la contraseña vieja

// FALTA TERMINAR - 
// ya busca el usuario por su id y lo encuentra

router.post('/reset', async (req, res, next) => {

    let { userId } = req.body; // Si quiero borrar una pass
    let { newPassword } = req.body; // Luego de borrarla necesito una nueva
    let { oldPassword } = req.body; // Si quiero solo cambiar mi contraseña
    
    
    try {
        let findUserById = await Users.find({_id: userId})
        
        if (findUserById === 0) return res.send('Usuario no encontrado')
        
        if (userId && newPassword && oldPassword) { // Actualizo una vieja contraseña
    
        }
        if (userId && newPassword && !oldPassword) { // Seteo un nueva contraseña
    
        }
        if (userId && !newPassword && !oldPassword) { // Reinicio la contraseña
    
        }
        

    } catch (error) {
        console.log(error)
        res.send('Ocurrió un error durante el reinicio de contraseña')
    }
    
})


module.exports = router;

