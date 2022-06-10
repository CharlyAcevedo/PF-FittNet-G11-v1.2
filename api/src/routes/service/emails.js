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


//-------------------------------------------------------------------------------
// Esta función crea el cuerpo del correo a enviar
//------------------------------------------------------------------------------- 
function createBodyEmail(gymName, product, quantity, price, phone, user) {

  let bodyEmail = `<b> ${user} gracias por tu compra! </br> Detalle de tu compra: 
  </br> ${product} x ${quantity} x US$ ${price}, total US$ ${quantity * price} </b>
  </br> en el gimnasio ${gymName} telefono del gimnasio ${phone}`

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
  // Esta es la ruta para postman
  // http://localhost:3001/api/service/emails/fer_0144@hotmail.com

  // Recordar que userName es un email
  const { userId, saleId } = req.body;
  console.log(req.body)

  // Si recibo id del user lo podría buscar en la base de datos y sacar la info 
  // de name, product, quantity y price de su carrito.
  if (!isValidObjectId(userId) || !isValidObjectId(saleId)) {
    return res.send('User id o sale id no valido')
  }

  const dataSale = await ShopCart.aggregate([
    {
      $match: { _id: ObjectId(saleId) }
    },
    { $lookup: { from: 'gyms', localField: 'gyms', foreignField: '_id', as: 'gyms' } },
    { $unwind: { path: '$gyms', preserveNullAndEmptyArrays: true } },

    { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'user' } },
    { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },

    { $lookup: { from: 'services', localField: 'services', foreignField: '_id', as: 'services' } },
    { $unwind: { path: '$services', preserveNullAndEmptyArrays: true } },
    { $project: { _id: 1, user: { name: 1, userName: 1 }, gyms: { name: 1, phone: 1 }, services: { name: 1 }, price: 1, quantity: 1 } }
  ])  

  // if (!regEmail.test(email)) { // Testeo que sea un email
  //   return res.send('El valor recibido no es un email');
  // }

  // {
  //   _id: new ObjectId("62a3a2a2bbb65b18fa74deba"),
  //   user: { name: 'fredito', userName: 'largelescano@gmail.com' },
  //   gyms: { name: 'gym de prueba Charly', phone: 345345345 },  
  //   services: { name: 'spring' },
  //   price: new Decimal128("500"),
  //   quantity: 2
  // }
  
  const { user, gyms, services, price, quantity } = dataSale[0]
  const { name, phone } = gyms
  const nameserv = services.name
  const username = user.name
  const email = user.userName
  let body = createBodyEmail(name, nameserv, quantity, price, phone, username);
  // const { name, userName} = user
  // let body = createBodyEmail(name, product, quantity, price, phone, gyms);
  // Este body lo mandaría al item html
  console.log('correoenviad2')

  try {
    if (email && body) { // Una verificación que sea necesria
      await transporter.sendMail({
      from: '"Fittnet - Confirmación de compra" <fittnet.com>', // sender address
      to: 'jessim.longo@gmail.com', // list of receivers
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

