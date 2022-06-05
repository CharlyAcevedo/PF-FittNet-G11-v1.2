const { Router } = require('express');
const Users = require('../../models/User')
const { findUser, updatePassword } = require('../../controlers/users');
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
    let { password } = req.body; 
    let { secretToken } = req.body;
    console.log('está entrando al post de update password', req.body)
    
    try {
        let findUserById = await Users.find({_id: userId})
        
        if (findUserById === 0) return res.send('Usuario no encontrado')
        
        // function updatePassword(userId, newPassword, password, secretToken)

        if (userId && newPassword && password && !secretToken) { // Actualizo una vieja contraseña
            // debería tener una función que hata todo esto
            // y poder pasarle todos los argumentos y que lo resuelva
            // al final me debería retornar un boleano true or false
            // en caso de éxito o rechazo
            // Y finalmente responder al front
            let passwordUpdate = await updatePassword( userId, newPassword, password, secretToken );
            if (passwordUpdate) {
                return res.send('Contraseña actualizada')
            } else {
                return res.send('No pudo realizarse la actualización de la contraseña')
            }
        }

        if (userId && newPassword && !password && secretToken) { // Seteo un nueva contraseña
            // debería tener una función que hata todo esto
            // y poder pasarle todos los argumentos y que lo resuelva
            // al final me debería retornar un boleano true or false
            // en caso de éxito o rechazo
            // Y finalmente responder al front
            let passwordUpdate = await updatePassword( userId, newPassword, password, secretToken );
            
            if (passwordUpdate) {
                return res.send('Contraseña actualizada')
            } else {
                return res.send('No pudo realizarse la actualización de la contraseña')
            }
            
        }      
      
        

    } catch (error) {
        console.log(error)
        res.send('Ocurrió un error durante el reinicio de contraseña')
    }
    
})

router.get('/updatepassword', async (req, res, next) => {
    let { userName } = req.query;
    // console.log('está entrando al get de update password', req.query)
    let user = await findUser({userName:userName})
    // console.log(user)
    if (user === null) {
        return res.send({message: 'Usuario no encontrado'});
    }
    // let secretToken = user.secretToken
    // console.log(user, secretToken, 'si encuentro el user y el token')

    // debo enviar el correo electrónico con el secret    
    // router.get('/email/:userId/:secretToken/:userName',
    res.redirect(`/api/service/email/recovey/${user._id}/${user.secretToken}/${userName}`);
 

})


module.exports = router;

