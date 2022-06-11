const { Router } = require('express');
const Users = require('../../models/User')
const { deleteUser } = require('../../controlers/users')
const InfoUsers = require('../../models/InfoUser');
const Partner = require('../../models/Partner');
const bcrypt = require('bcrypt');
const randomstring = require("randomstring");
const LockAccounts = require('../../models/LockAccount');


const router = Router();


function isAuthenticated(req, res, next) {
  console.log(req.session, ' esto es req.session register isAuthenticated');
  console.log(req.user, ' esto es req.user register isAuthenticated');
  console.log(req.cookies,' esto es req.cookies register isAuthenticated' )
  console.log(req.signedCookies,' esto es req.signedCookies register isAuthenticated' )
  if (req.isAuthenticated()) {
    res.redirect('/api/service/register');
  } else {
    next();
  }
}



//-------------------------------------------------------------------------------
// Esta ruta get responde cuando un usuario con sesión activa intenta
// hacer un post a /api/service/register.
//-------------------------------------------------------------------------------

router.get('/register', (req, res, next) => {
  res.send('No puede realizar un post /register mientras su sesión esté iniciada');
})


//-------------------------------------------------------------------------------
// Esta ruta post recibe request para crear nuevos usuarios en la base de datos.
//-------------------------------------------------------------------------------

router.post('/register', isAuthenticated, async (req, res, next) => {   
  //También debería recibir tipo de usuario "admin", "client" o "partner"
  
  const { name, username, password, latitude, longitude, type } = req.body;
  // console.log(req.body, 'lo que llega por body')
  
  if (!name && !username || !password || !type) {
    return res.send('campos incompletos');
  }
  
  try {

    let lockAccount = await LockAccounts.find({userName: username})
    
    // console.log(lockAccount, ' esto es req.user autenticado');

    if (lockAccount.length > 0 ) { // Si está baneado
      return res.redirect('/api/service/lockedaccount');
    }
    
    
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
        
        return res.json({created: false, message: 'El correo indicado no está disponible, por favor indique otro email'});

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
            latitude: latitude,
            longitude: longitude,
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
            userActive: true,
            gyms: []
          })
          await newPartnerInfo.save();
          newUser = await Users.create({
            userName: username,
            name: name,
            password: promiseAll[2],
            latitude: latitude,
            longitude: longitude,
            secretToken: promiseAll[1],
            active: false,
            type: type,
            partner: newPartnerInfo._id
          });
          
        }

        if (type === "admin") {
          newUser = await Users.create({
            userName: username,
            name: name,
            password: promiseAll[2],            
            latitude: latitude,
            longitude: longitude,
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
        res.redirect(`/api/service/email/activation/${userId}/${promiseAll[1]}/${newUser.userName}`);     
      }

    } else {

      res.status(404).send('Datos incompletos, el registro no fue creado ');

    }

  } catch (error) {
    console.log(error)
    res.status(404).send('Error: el registro no fue creado');
  }
});


//-------------------------------------------------------------------------------
// Esta estructuctura la necesito si uso el método authenticate de passport
//-------------------------------------------------------------------------------
// app.post ("/login", passport.authenticate('local', {
//   successRedirect: "/dashboard",
//   failureRedirect: "/login",
// }))

module.exports = router;
