const { Router } = require('express');
const Users = require('../models/User')
const { deleteUser } = require('../controlers/users')
const InfoUsers = require('../models/InfoUser');
const Partner = require('../models/Partner');
const bcrypt = require('bcrypt');
const randomstring = require("randomstring");


const router = Router();


function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/api/register');
  } else {
    next();
  }
}



//-------------------------------------------------------------------------------
// Esta ruta get responde cuando un usuario con sesión activa intenta
// hacer un post a /api/register.
//-------------------------------------------------------------------------------

router.get('/register', (req, res, next) => {
  res.send('No puede realizar un post /register mientras su sesión esté iniciada');
})


//-------------------------------------------------------------------------------
// Esta ruta post recibe request para crear nuevos usuarios en la base de datos.
//-------------------------------------------------------------------------------

router.post('/register', isAuthenticated, async (req, res, next) => {   
  //También debería recibir tipo de usuario "admin", "client" o "partner"
  
  const { name, username, password, type } = req.body;
  // console.log(req.body, 'lo que llega por body')
  
  if (!name && !username || !password || !type) {
    return res.send('campos incompletos');
  }
  
  try {
    
    
    if ( name && username && password && type) {  
      let salt = 8; // número de saltos "niveles de seguridad"
      let newUser;        
      let userId;

      // No pongo el await para que no las espere las romesas y vaya directamente al promiseAll
      const findUser = Users.find({userName: username})   
      const secretToken = randomstring.generate(7); // Genero un token de seguridad
      const hashPassword = bcrypt.hash(password, salt)
      
      // Largo las tres promesas en paralelo para ahorar tiempo
      let promiseAll = await Promise.all([findUser, secretToken, hashPassword])

      console.log(promiseAll, 'mis tres promesas!')

      if (promiseAll[0].length !== 0) { // Si el correo ya existe
        
        return res.send('El nombre de usuario ya existe o es incorrecto, por favor indique otro username');

      } else { // Si no encuentro el correo en bd, creo el usuario con ese email
       
        if (type === 'user') {
          const newUserInfo = new InfoUsers({
            name: name,
            email: username
          })
          await newUserInfo.save();
          console.log("esta es la info del user", newUserInfo);
          newUser = await Users.create({
            userName: username,
            name: name,
            password: promiseAll[2],
            secretToken: promiseAll[1],
            active: false,
            type: type,
            info: newUserInfo._id
          });
          
        }

        if (type === "partner") {
          const newPartnerInfo = new Partner({
            name: name,
            email: username,
            userActive: true
          })
          await newPartnerInfo.save();
          newUser = await Users.create({
            userName: username,
            name: name,
            password: promiseAll[2],
            secretToken: promiseAll[1],
            active: false,
            type: type,
            info: newPartnerInfo._id
          });
          
        }

        if (type === "admin") {
          newUser = await Users.create({
            userName: username,
            name: name,
            password: promiseAll[2],
            secretToken: promiseAll[1],
            active: false,
            type: type,
          });
          
        }
        // console.log(newUser, 'newUser de la 122')

        if (newUser._id) {
          userId = newUser._id
        }
        
        // Mando a la próxima ruta id, secretToken y correo electrónico por params
        res.redirect(`/api/email/${userId}/${promiseAll[1]}/${newUser.userName}`);     
      }

    } else {

      res.status(404).send('Datos incompletos, el registro no fue creado ');

    }

  } catch (error) {
    console.log(error)
    res.status(404).send('Error: el registro no fue creado');
  }

  //---- CUIDADO OJO ---- ruta para borrar usuarios

  router.delete('/api/user/delete/:id', isAuthenticated, async (req, res, next) => {
    const {id} = req.params;
    const response = deleteUser(id);
    console.log(response)
    res.send(response)
  })

})


//-------------------------------------------------------------------------------
// Esta estructuctura la necesito si uso el método authenticate de passport
//-------------------------------------------------------------------------------
// app.post ("/login", passport.authenticate('local', {
//   successRedirect: "/dashboard",
//   failureRedirect: "/login",
// }))

module.exports = router;
