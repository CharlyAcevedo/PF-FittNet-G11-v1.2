const { Router } = require('express');
const Users = require('../../models/User')
const bcrypt = require('bcrypt');
const { isValidObjectId } = require('../../controlers/users')


const router = Router();


//-----------------------------------------------------------------------
// Esta ruta responde cuando necesito activar una cuenta recién creada y es
// llamada directamente por los usuarios cuando les enviamos el correo de
// validación de email, en el cual va un link para llamarla.
//------------------------------------------------------------------------

router.get('/activation/:userId/:secretToken', async (req, res, next) => {
  let { userId, secretToken } = req.params;
  // console.log(req.params, ' el id y el secret en activation')

  try {
      // let user = await Users.find({_id: userId});
      let user = await Users.findById(userId);

      // console.log(user, 'paso1')

      // if (user.length && user[0].secretToken === secretToken) {
      if (user._id && user.secretToken === secretToken) {
        let activationToken = await Users.findByIdAndUpdate(userId, {active: true});
        // console.log(activationToken, 'paso2')

        if (activationToken.name) {
          let name = activationToken.name;
          return res.status(200).send(`<h3>Felicitaciones ${name} cuenta ha sido activada con éxito</h3>`);
        }

        return res.status(200).send('La cuenta no puedo ser activada')
      }
      res.send('Usuario no encontrado');
  
    } catch (error) {
      console.log(error)
      res.status(400).send('Ocurrió un error durante la activación');     
    }
})


//-------------------------------------------------------------------------
// Esta ruta responde cuando un usuario necesita "borrar" (desactivar) su
// cuenta en la app. El estado active del usuario pasa a ser "false"
//-------------------------------------------------------------------------

router.put('/deleteuseraccount', async (req, res, next) => {
    let { userId, password } = req.body;
    console.log('Put a delete user account')

    let isObjectId = isValidObjectId(userId); // valido el uuid
    if (!isObjectId) return res.send('Id no valido')

  
    try {
        // console.log('Va y busca en la base de datos con el id')
        let user = await Users.findById(userId);
        // Adventure.findById(id, function (err, adventure) {});
        // let user = await Users.findById(userId);
        // .then((response)=>{ return response})
        // .catch((error)=> { return res.send('Usuario no encotrado')})

        let compare;
        let inactiveAccount;
        // console.log(user, 'el user de la premesa 62')

        if (!user) {
            return res.send('Usuario no encotrado');

        } else {           
            compare = await bcrypt.compare(password, user.password);
        }

        if (!compare) {
            return res.send('Contraseña incorrecta');

        } else {            
            inactiveAccount = await Users.findByIdAndUpdate(userId, {active: false});
        }

        if (inactiveAccount) {
            return res.send('Su cuenta ha sido desactivada exitosamente');
        } else {
            return res.send('No hemos podido desactivar su cuenta, intente nuevamente por favor');
        }
    
      } catch (error) {
        console.log(error)
        res.status(400).send('Ocurrió un errordurante el proceso de inactivación');     
      }
  
  })


module.exports = router;
