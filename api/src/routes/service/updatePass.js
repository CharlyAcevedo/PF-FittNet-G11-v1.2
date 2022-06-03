const { Router } = require('express');
const Users = require('../../models/User')

// const cookieparser = require('cookie-parser');
const router = Router();

// uso esta ruta para "borrar" la contraseña
// podría reutilizar esta ruta para cambiar la contraseña
// para lo segundo debería recibir la contraseña vieja

// FALTA TERMINAR - 
// ya busca esl usuario por su id y lo encuentra

router.post('/updatepassword', async (req, res, next) => {

    let { userId } = req.body; 
    let { newPassword } = req.body;
    let { oldPassword } = req.body; 
    let { secretToken } = req.body;
    
    
    try {
        let findUserById = await Users.find({_id: userId})
        
        if (findUserById === 0) return res.send('Usuario no encontrado')
        
        if (userId && newPassword && oldPassword && !secretToken) { // Actualizo una vieja contraseña
    
        }
        if (userId && newPassword && !oldPassword && secretToken) { // Seteo un nueva contraseña
    
        }
        if (userId && !newPassword && !oldPassword && !secretToken) { // Reinicio la contraseña
    
        }
        

    } catch (error) {
        console.log(error)
        res.send('Ocurrió un error durante el reinicio de contraseña')
    }
    
})


module.exports = router;

