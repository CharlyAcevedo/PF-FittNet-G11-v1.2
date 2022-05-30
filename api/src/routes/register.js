const { Router } = require('express');
const Users = require('../models/User')
const { findUser, findAllUsers, createUser, deleteUser } = require('../controlers/users')
const InfoUsers = require('../models/InfoUser');
const Partner = require('../models/Partner');

// const cookieparser = require('cookie-parser');
const router = Router();
// router.use(cookieparser()); // veremos


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

  console.log(req.body, 'lo que llega por body')

  if (!name && !username || !password || !type) {
    return res.send('campos incompletos');
  }
  
  try {

    
    if ( name && username && password && type) {  
 
      let findUser = await Users.find({userName: username})
    

      if (findUser.length !== 0) { // Si el correo ya existe
        console.log('El nombre de usuario ya existe o es incorrecto, por favor indique otro username');
        return res.send('El nombre de usuario ya existe o es incorrecto, por favor indique otro username');

      } else { // Si no el correo en bd, lo creo el usuario

        // Hay que hacer la consulta a la BD de mongose

        if (type === 'user') {
          const newUserInfo = new InfoUsers({
            name: name,
            email: username
          })
          await newUserInfo.save();
          console.log("esta es la info del user", newUserInfo);
          const newUser = await Users.create({
            userName: username,
            name: name,
            password: password,
            type: type,
            info: newUserInfo._id
          });
          res.status(200).json(newUser)
        }

        if (type === "partner") {
          const newPartnerInfo = new Partner({
            name: name,
            email: username,
            userActive: true
          })
          await newPartnerInfo.save();
          const newUser = await Users.create({
            userName: username,
            name: name,
            password: password,
            type: type,
            info: newPartnerInfo._id
          });
          res.status(200).json(newUser)
        }

        if (type === "admin") {
          const newUser = await Users.create({
            userName: username,
            name: name,
            password: password,
            type: type,
          });
          res.status(200).json(newUser)
        }


        // Acá debería crear el user en la db
        // y retornar un mensaje de usuario creado con éxito
        // por ahora devuelvo el user creado
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

