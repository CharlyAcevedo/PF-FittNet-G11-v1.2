const { Router } = require('express');
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'sysorestudios@gmail.com',
        pass: 'hctbzqgmgbiitjtm'
    }
});
transporter.verify(()=>{
  console.log('Ready for send emails')
})


const router = Router();



//-------------------------------------------------------------------------------
// Esta ruta envía un correo electrónico de verificación para la validación 
// del email registrado (validar para activar la cuenta)
//-------------------------------------------------------------------------------

router.get('/email/:userId/:secretToken', async (req, res, next) => {
  let { userId, secretToken } = req.params;
  // console.log(req.params, 'el userID y el sercretToken')
  // console.log('este código entraaa')
  // http://localhost:3000/activation/ -> activación en el front
  let verifitationLink = `http://localhost:3000/activation/${userId}/${secretToken}`
  try {
    await transporter.sendMail({
      from: '"Activación de cuenta" <fittnet.com>', // sender address
      to: "fer_0144@hotmail.com", // list of receivers
      subject: "Activación de cuenta FittNet", // Subject line
      html: `<b>Por favor has click en el siguiente link para verificar su correo</b>
      <a href="${verifitationLink}">${verifitationLink}</a> ` // html body
    });
    
    res.send('Te mando el correo con el token');

  } catch (error) {
    console.log(error)    
  }

})


//-------------------------------------------------------------------------------
// Esta estructuctura la necesito si uso el método authenticate de passport
//-------------------------------------------------------------------------------
// app.post ("/login", passport.authenticate('local', {
//   successRedirect: "/dashboard",
//   failureRedirect: "/login",
// }))

//-------------------------------------------------------------------------------
// Esta estructuctura la necesito si NO uso el método authenticate de passport
//------------------------------------------------------------------------------- 
// function isAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     res.redirect('/api/register');
//   } else {
//     next();
//   }
// }

module.exports = router;
    
