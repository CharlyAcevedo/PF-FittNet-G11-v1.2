const router = require("express").Router();
const ObjectId = require('mongoose').Types.ObjectId;
const Users = require('../../models/User');
const LockAccounts = require('../../models/LockAccount');
const { regEmail } = require('../../controlers/regExes');

// function isAuthenticated(req, res, next) {

//   // console.log(req.body, 'que trae el body?')
//   console.log(req.session, 'si--- esto es req.session register isAuthenticated');
//   console.log(req.user, 'si--- esto es req.user register isAuthenticated');
//   console.log(req.cookies,'no--- esto es req.cookies register isAuthenticated');
//   console.log(req.signedCookies,'si--- esto es req.signedCookies register isAuthenticated');
//   // El browser no me trajo nada, solo un resto de cookie
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     res.redirect('/api/service/logout');
//   }
// }
// router.get('/logout', function(req, res){
//   res.send('Necesita iniciar sesión para poder hacer un post a logout')
// })

// router.post('/logout', isAuthenticated,
//   function(req, res){
//     req.logout();
//     // res.clearCookie('sid'); // clear session id - ver si es necesario
//     res.redirect('/');
//   }
// );


function isValidObjectId(id) {

  if (ObjectId.isValid(id)) {
    if ((String)(new ObjectId(id)) === id)
      return true;
    return false;
  }
  return false;
}

//--------------------------------------------------------------------------------
// Consulta la lista de correos baneados el sitio
//--------------------------------------------------------------------------------

router.get("/lockaccounts", async (req, res) => {
  try {
    let lockAccounts = await LockAccounts.find().sort({ userName: 'asc', test: -1 });
    // console.log(blockAccounts);
    res.json(lockAccounts);

  } catch (error) {
    console.log(error);
    res.status(error.status).json({ error: error.message });
  }
});

//--------------------------------------------------------------------------------
// Agrega un email a la lista de correos baneados para que no funcione en el sitio
//--------------------------------------------------------------------------------

router.put("/lockaccounts", async (req, res) => {

  let { userName } = req.body;
  
  if (!regEmail.test(userName)) {
    return res.send('El campo recibido no es un email');
  }
  try {
    let account = await LockAccounts.find({ userName: userName });

    if (account.length > 0 ) { // Si ya exite la cuenta en la lista
      return res.json(null)
       // no agrega la cuenta a la lista y responde con null 
    }

    let lockAccounts = await LockAccounts.create({ userName: userName });
    
    res.json(lockAccounts);
    // si agrega la cuenta a la lista responde con el objeto agregado 

  } catch (error) {
    console.log(error);
    res.status(error.status).json({ error: error.message });
  }
});

//--------------------------------------------------------------------------------
// Quita un email a la lista de correos baneados
//--------------------------------------------------------------------------------

router.delete("/lockaccounts", async (req, res) => {

  let { userName } = req.body;

  if (!regEmail.test(userName)) {
    return res.send('El campo recibido no es un email');
  }
  try {
    let lockAccounts = await LockAccounts.findOneAndDelete({ userName: userName });
    
    res.json(lockAccounts); 
    // si borra una cuenta responde con el objeto borrado 
    // si la cuenta no existe responde null 

  } catch (error) {
    console.log(error);
    res.status(error.status).json({ error: error.message });
  }
});



//--------------------------------------------------------------------------------
// Elimina toda la información completa de un usuario
//--------------------------------------------------------------------------------
router.delete("/delete", async (req, res, next) => {
  const { userId } = req.body;

  try {
    if (!isValidObjectId(userId)) {
      return res.send('Id invalido');
    }
    
    let userDelete = await Users.findOneAndDelete({ _id: userId });
    // Borrar la cuenta solo por solicitud del usuario -- Fata que sea completo 

    res.send(userDelete);

  } catch (error) {
    console.log(error)

  }
});
//--------------------------------------------------------------------------------
// Responde con la info completa del usuario admin 
//--------------------------------------------------------------------------------
router.get("/userId/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    if (!isValidObjectId(userId)) {
      return res.send('Id invalido');
    }

    let user = await Users.findById(userId);

    res.json(user);

  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
});
//--------------------------------------------------------------------------------
// Responde con la info de todos los users 
//--------------------------------------------------------------------------------
router.get("/allusers", async (req, res) => {

  try {
    let pipeline = { $match: { type: "user" } };

    let allUsers = await Users.aggregate([pipeline,      
      {
        $project: {
          name: 1, //! 1 -> mostrar - 0 -> 0
          userName: 1,
          _id: 1,
          type: 1,
          active: 1,
          avatar: 1,
        }
      }]).sort({ name: 'asc', test: -1 });

    res.json(allUsers);

  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
});
//--------------------------------------------------------------------------------
// Responde con la info de todos los partners 
//--------------------------------------------------------------------------------
router.get("/allpartners", async (req, res) => {
  try {

    let pipeline = { $match: { type: "partner" } };


    let allUsers = await Users.aggregate([pipeline,
      {
        $project: {
          name: 1, //! 1 -> mostrar - 0 -> 0
          userName: 1,
          _id: 1,
          type: 1,
          active: 1,
          avatar: 1,
        }
      }]).sort({ name: 'asc', test: -1 }); 

    res.json(allUsers);

  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
});

module.exports = router;