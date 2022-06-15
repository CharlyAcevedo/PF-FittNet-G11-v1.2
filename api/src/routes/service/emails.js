const { Router } = require('express');
const nodemailer = require("nodemailer");
const USER_ACCOUNT = process.env.USER_ACCOUNT;
const PASS_ACCOUNT = process.env.PASS_ACCOUNT;
const CORS_URL = process.env.CORS_URL || 'http://localhost:3000';
const { regEmail } = require('../../controlers/regExes')
const ObjectId = require('mongoose').Types.ObjectId
const ShopCart = require('../../models/ShopCart')
const { getShopCart } = require('../../controlers/shopCart')

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
transporter.verify(() => {
  console.log('Ready for send emails')
})


const router = Router();


//! let body = createBodyEmail(username, gymName, phoneGym,saleDetail);
//-------------------------------------------------------------------------------
// Esta función crea el cuerpo del correo a enviar
//------------------------------------------------------------------------------- 
function createBodyEmail(username, gymName, phoneGym, saleDetail) {


  //? username -> Es un string
  //? gymName -> Es un string
  //? phoneGym -> Es un string
  //? saleDetail -> Es un array de objetos


  let bodyEmail = `<b> ${username} gracias por tu compra! </br> Detalle de tu compra: 
  </br> en el gimnasio ${gymName} telefono del gimnasio ${phoneGym}`

  // Fernando gracias por tu compra!
  // Detalle de tu compra:
  // Clase de yoga x 3 x US$ 5, total US$ 15
  console.log('correoenviado')
  return bodyEmail;
};

function isValidObjectId(id) {

  if (ObjectId.isValid(id)) {
    if ((String)(new ObjectId(id)) === id)
      return true;
    return false;
  }
  return false;
}


//-------------------------------------------------------------------------------
// Esta ruta envía un correo electrónico de  
//-------------------------------------------------------------------------------
// definir cual va a se la dirección en el back, cómo y qué parametros vamos a
// recibir para hacer el envío del email
//-------------------------------------------------------------------------------

router.post('/emails', async (req, res, next) => {

  console.log(req.body)

  // const { user, gyms, services, price, quantity } = dataSale[0]
  // const { name, phone } = gyms
  // const nameserv = services.name
  // const username = user.name
  // const email = user.userName

  const { userDetail, gymDetail, saleDetail } = req.body

  const { userName, email } = userDetail //? -> username: nombre y apellido 

  const { gymName, phoneGym } = gymDetail
  // ! let body = createBodyEmail(name, nameserv, quantity, price, phone, username);
  let body = createBodyEmail(userName, gymName, phoneGym, saleDetail);
  // const { name, userName} = user
  // let body = createBodyEmail(name, product, quantity, price, phone, gyms);
  // Este body lo mandaría al item html
  // console.log('correoenviad2', body)

  try {
    if (email && body) { // Una verificación que sea necesria
      await transporter.sendMail({
        from: '"Fittnet - Confirmación de compra" <fittnet.com>', // sender address
        to: email, // list of receivers
        subject: "Confirmación de compra", // Subject line
        html: body
        // html: `<b> Acá va el cuerpo del correo y puede ser un html </b>` // html body
      });
      console.log('correoenviado3')
      res.json({ sended: true, message: 'Correo enviado con éxito' });
      // Si hay que responder al front para confirmar que el correo fue enviado     
    }

  } catch (error) {
    console.log(error)
    res.json({ sended: false, message: 'Ocurrió un error y el correo no ha sido envíado' });
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

