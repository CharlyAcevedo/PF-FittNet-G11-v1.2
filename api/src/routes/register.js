const { Router } = require('express');
const Users = require('../models/User')

// const cookieparser = require('cookie-parser');
const router = Router();
// router.use(cookieparser()); // veremos



// Esta función evalua si estoy autenticado, se puede importar
function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
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
  
  if ( !name && !username || !password || !type ) {
      return res.send('campos incompletos');
  }
  
  try {
    
    if ( name && username && password && type) {  
 
      let findUser = await Users.find({userName: username})
    
      if (findUser.length !== 0) { // Si el correo ya existe
        console.log('El nombre de usuario ya existe o es incorrecto, por favor indique otro username');
        return  res.send('El nombre de usuario ya existe o es incorrecto, por favor indique otro username');
        
      } else { // Si no el correo en bd, lo creo el usuario
           
        const newUser = await Users.create({
          userName: username,
          name: name,
          password: password,
          type: type
        });  
        
        res.status(200).json(newUser)
      }        
  
     } else {
      
      res.status(404).send('Datos incompletos, el registro no fue creado ');
        
    }
    
  } catch (error) {
    console.log(error)
    res.status(404).send('Error: el registro no fue creado');
  }

})


//-------------------------------------------------------------------------------
// Esta estructuctura la necesito si uso el método authenticate de passport
//-------------------------------------------------------------------------------
// app.post ("/login", passport.authenticate('local', {
//   successRedirect: "/dashboard",
//   failureRedirect: "/login",
// }))

module.exports = router;

