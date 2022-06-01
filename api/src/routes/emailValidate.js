const { Router } = require('express');
const nodemailer = require("nodemailer");
const USER_ACCOUNT = process.env.USER_ACCOUNT
const PASS_ACCOUNT = process.env.PASS_ACCOUNT

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: USER_ACCOUNT,
        pass: PASS_ACCOUNT
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

router.get('/email/activation/:userId/:secretToken/:userName/', async (req, res, next) => {
  let { userId, secretToken, userName, typeOperation } = req.params;
  // Recordar que userName es un email
  // console.log(req.params, 'el userID, el sercretToken y el userName')
  // http://localhost:3000/activation/ -> activación en el front
  console.log(req.params, ' cómo están los params 34')

  let verifitationLink = `http://localhost:3000/activation/${userId}/${secretToken}`
  try {
    if (userId && secretToken && userName ) {
      await transporter.sendMail({
      from: '"Activación de cuenta" <fittnet.com>', // sender address
      to: userName, // list of receivers
      subject: "Activación de cuenta FittNet", // Subject line
      html: `<b>Por favor has click en el siguiente link para verificar su correo</b>
      <a href="${verifitationLink}">${verifitationLink}</a> ` // html body
      });
      
      res.send('Send email to verify');  
     
    }
    
  } catch (error) {
    console.log(error)    
  }

})

router.get('/email/recovey/:userId/:secretToken/:userName', async (req, res, next) => {
  let { userId, secretToken, userName} = req.params;
  // Recordar que userName es un email
  // console.log(req.params, 'el userID, el sercretToken y el userName')
  // http://localhost:3000/activation/ -> activación en el front

  // let verifitationLink = `http://localhost:3000/activation/${userId}/${secretToken}`
  try {
    if (userId && secretToken && userName ) {      
      await transporter.sendMail({
        from: '"Recuperación de cuenta" <fittnet.com>', // sender address
        to: userName, // list of receivers
        subject: "Recuperación de cuenta FittNet", // Subject line
        html: `<p>Token de seguridad que le será solicitado en nuestra página</p> <br/> <b>${secretToken}</b>` // html body
      });
      
      res.status(200).json(userId);
    }

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
    
