const router = require("express").Router();
const ObjectId = require('mongoose').Types.ObjectId;
const Users = require('../../models/User');

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


router.delete("/delete", async (req, res, next) => {
  const { userId } = req.body;

  try {  
    if(!isValidObjectId(userId)) {
      return res.send('Id invalido');
    }

    let userDelete = await Users.findOneAndDelete({ _id: userId });
    
    // console.log(userDelete, 'llegó la solicitud');
    
    res.send(userDelete);

  } catch (error) {
    console.log(error)
    
  }
});



router.get("/userId/:userId", async (req, res) => {
  const { userId } = req.params;

    try {
      if(!isValidObjectId(userId)) {
        return res.send('Id invalido');
      }

      let user = await Users.findById(userId);

      res.json({user});

    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
});

module.exports = router;