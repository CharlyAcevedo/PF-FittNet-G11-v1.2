const { Router } = require('express');
const Users = require('../models/User')
const bcrypt = require('bcrypt');


const router = Router();

router.put('/activation', async (req, res, next) => {
  let { userId, secretToken } = req.body;

  try {
      let user = await Users.find({_id: userId});

      if (user.length && user[0].secretToken === secretToken) {
        let activationToken = await Users.findByIdAndUpdate(userId, {active: true});
        
        if (activationToken) {
            return res.status(200).send('Cuenta activada con éxito');
        }

        return res.status(200).send('La cuenta no puedo ser activada')
      }
      res.send('Usuario no encontrado');
  
    } catch (error) {
      console.log(error)
      res.status(400).send('Ocurrió un error durante la activación');     
    }

})


router.put('/deleteuseraccount', async (req, res, next) => {
    let { userId, password } = req.body;
    // res.send('Put a delete user account')
  
    try {
        let user = await Users.findById(userId);

        let compare;
        let inactiveAccount;

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
