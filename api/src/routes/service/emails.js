const { Router } = require('express');
const nodemailer = require("nodemailer");
const USER_ACCOUNT = process.env.USER_ACCOUNT;
const PASS_ACCOUNT = process.env.PASS_ACCOUNT;
const CORS_URL = process.env.CORS_URL || 'http://localhost:3000';
const { regEmail } = require('../../controlers/regExes')

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: USER_ACCOUNT,
        pass: PASS_ACCOUNT,
    },
    tls: {
      rejectUnauthorized: false,
    },
});
transporter.verify(()=>{
  console.log('Ready for send emails')
})


const router = Router();


//-------------------------------------------------------------------------------
// Esta función crea el cuerpo del correo a enviar
//------------------------------------------------------------------------------- 
function createBodyEmail(name, product, quantity, price){
  
  let bodyEmail = `<b> ${name} gracias por tu compra! </br> Detalle de tu compra: 
  </br> ${product} x ${quantity} x US$ ${price}, total US$ ${quantity * price} </b>`
  
  // Fernando gracias por tu compra!
  // Detalle de tu compra:
  // Clase de yoga x 3 x US$ 5, total US$ 15
  
  return bodyEmail;
  
};



//-------------------------------------------------------------------------------
// Esta ruta envía un correo electrónico de  
//-------------------------------------------------------------------------------
// definir cual va a se la dirección en el back, cómo y qué parametros vamos a
// recibir para hacer el envío del email
//-------------------------------------------------------------------------------

router.get('/emails/:email', async (req, res, next) => {
  // Esta es la ruta para postman
  // http://localhost:3001/api/service/emails/fer_0144@hotmail.com
  
  // Recordar que userName es un email
  let {email} = req.params;

  // Si recibo id del user lo podría buscar en la base de datos y sacar la info 
  // de name, product, quantity y price de su carrito.
  
  console.log(email, 'voy a mandar un email');  
  
  if (!regEmail.test(email)) { // Testeo que sea un email
    return res.send('El valor recibido no es un email');
  }

  let name = "Fernando";
  let product = "Clase de yoga";
  let quantity = 3;
  let price = 5;

  let body = createBodyEmail(name, product, quantity, price);
  // Este body lo mandaría al item html

  try {
    if (email && body) { // Una verificación que sea necesria
      await transporter.sendMail({
      from: '"Fittener - Confirmación de compra" <fittnet.com>', // sender address
      to: email, // list of receivers
      subject: "Confirmación de compra", // Subject line
      html: body
      // html: `<b> Acá va el cuerpo del correo y puede ser un html </b>` // html body
      });
      
      res.json({sended: true, message:'Correo enviado con éxito'});  
      // Si hay que responder al front para confirmar que el correo fue enviado
     
    }
    
  } catch (error) {
    console.log(error)
    res.json({sended: false, message:'Ocurrió un error y el correo no ha sido envíado'});      
  }

})











// router.get('/email/recovey/:userId/:secretToken/:userName', async (req, res, next) => {
//   let { userId, secretToken, userName} = req.params;
//   // Recordar que userName es un email
//   // console.log(req.params, 'el userID, el sercretToken y el userName')
//   // http://localhost:3000/activation/ -> activación en el front

//   // let verifitationLink = `http://localhost:3000/activation/${userId}/${secretToken}`
//   try {
//     if (userId && secretToken && userName ) {      
//       await transporter.sendMail({
//         from: '"Recuperación de cuenta" <fittnet.com>', // sender address
//         to: userName, // list of receivers
//         subject: "Recuperación de cuenta FittNet", // Subject line
//         html: `<p>Token de seguridad que le será solicitado en nuestra página</p> <br/> <b>${secretToken}</b>` // html body
//       });
      
//       res.status(200).json(userId);
//     }

//   } catch (error) {
//     console.log(error)    
//   }

// })

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
    
