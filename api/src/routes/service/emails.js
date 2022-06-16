const { Router } = require("express");
const nodemailer = require("nodemailer");
const USER_ACCOUNT = process.env.USER_ACCOUNT;
const PASS_ACCOUNT = process.env.PASS_ACCOUNT;
const CORS_URL = process.env.CORS_URL || "http://localhost:3000";
const { regEmail } = require("../../controlers/regExes");
const ObjectId = require("mongoose").Types.ObjectId;
const ShopCart = require("../../models/ShopCart");
const { getShopCart } = require("../../controlers/ShopCart");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
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
  console.log("Ready for send emails");
});

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

  /*{
  userDetail: { userName: 'esteban', email: '4estebanvillalba20@gmail.com' },
  gymDetail: { gymName: "Charly's Gym & Fitness", phoneGym: 345345345 },
  saleDetail: [
    { sericesName: 'Sprint', price: '500', quantity: 1, total: 500 },
    { sericesName: 'Yoga', price: '500', quantity: 1, total: 500 }
  ]
 */

  /* let bodyEmail = `<b> ${username} gracias por tu compra! </br> Detalle de tu compra: 
  </br> en el gimnasio ${gymName} telefono del gimnasio ${phoneGym} el servicio es ${total}`; */

  let bodyEmail1 = `
<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<style type="text/css">
	/* FONTS */
    @media screen {
		@font-face {
		  font-family: 'Lato';
		  font-style: normal;
		  font-weight: 400;
		  src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
		}
		
		@font-face {
		  font-family: 'Lato';
		  font-style: normal;
		  font-weight: 700;
		  src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
		}
		
		@font-face {
		  font-family: 'Lato';
		  font-style: italic;
		  font-weight: 400;
		  src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
		}
		
		@font-face {
		  font-family: 'Lato';
		  font-style: italic;
		  font-weight: 700;
		  src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
		}
    }
    
    /* CLIENT-SPECIFIC STYLES */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; }

    /* RESET STYLES */
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }

    /* iOS BLUE LINKS */
    a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
    }

    /* ANDROID CENTER FIX */
    div[style*="margin: 16px 0;"] { margin: 0 !important; }
</style>
</head>
<body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">

<!-- HIDDEN PREHEADER TEXT -->
<div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    Looks like you tried signing in a few too many times. Let's see if we can get you back into your account.
</div>

<table border="0" cellpadding="0" cellspacing="0" width="100%">
    <!-- LOGO -->
    <tr>
        <td bgcolor="#212121" align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="580" >
                <tr>
                    <td align="center" valign="top" style="padding: 40px 10px 40px 10px;">
                        <a href="http://litmus.com" target="_blank">
                            <img alt="Logo" src="https://res.cloudinary.com/salta/image/upload/v1654029469/logo-modo-BLANCO_smtgwu.png" width="100" height="100" style="display: block;  font-family: 'Lato', Helvetica, Arial, sans-serif; color: #ffffff; font-size: 18px;width: 190px;" border="0">
                        </a>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <!-- HERO -->
    <tr>
        <td bgcolor="#212121" align="center" style="padding: 0px 50px 0px 50px;">
            <table border="0" cellpadding="0" cellspacing="0" width="580" >
                <tr>
                    <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                      <h1 style="font-size: 32px; font-weight: 400; margin: 0;">Compra realizada con exito ${username}</h1>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <!-- COPY BLOCK -->
    <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="580" >
              <!-- COPY -->
              <tr>
                <td bgcolor="#ffffff" align="left" style="padding:10px 30px 10px 30px;color:#666666;font-family:'Lato',Helvetica,Arial,sans-serif;font-size:18px;font-weight:400;line-height:25px;display:flex;">
                  <p style="margin: auto;">Servicio</p>
                  <p style="margin: auto;">Cantidad</p>
                  <p style="margin: auto;">Precio</p>
                </td>
              </tr>
              `;


  var resume = saleDetail.map((r) => ({
    precio: r.price,
    cantidad: r.quantity,
    total: r.total,
    serviceName: r.sericesName,
  }));

  console.log(resume);

  // console.log(resume[0].email, 'el correo de la persona');
  function email(detalle) {
    var compra = [];
    var contador = 1;
    var precioTotal = 0;

    for (var i = 0; i < resume.length; i++) {
      var texto = `
      <tr>
        <td bgcolor="#ffffff" align="left" style="padding:10px 30px 10px 30px;color:#666666;font-family:'Lato',Helvetica,Arial,sans-serif;font-size:18px;font-weight:400;line-height:25px;display:flex;">
          <p style="margin: auto;">${detalle[i].serviceName}</p>
          <p style="margin: auto;">${detalle[i].cantidad}</p>
          <p style="margin: auto;">${detalle[i].total}</p>
        </td>
      </tr>`;
      compra.push(texto);
      precioTotal += detalle[i].total;
      contador += detalle[i].cantidad;
    }
    var detalleButton = `
    <tr>
      <td bgcolor="#ffffff" align="left">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
              <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td align="center" style="border-radius: 3px;" bgcolor="#f74177"><p target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 5px 25px; border-radius: 2px; border: 1px solid #f74177; display: inline-block;">TOTAL $ ${precioTotal}</P></td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;

    return compra.join("").concat(detalleButton);
  }

  let bodyEmail2 = email(resume);
  let bodyEmail3 = `
                
            </table>
        </td>
    </tr>
    <!-- COPY CALLOUT -->
    <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="580" >
                <!-- HEADLINE -->
                <tr>
                  <td bgcolor="#111111" align="left" style="padding: 40px 30px 20px 30px; color: #ffffff; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                    <h2 style="font-size: 24px; font-weight: 400; margin: 0;">Como coordinar dia y horario con ${gymName}?</h2>
                  </td>
                </tr>
                <!-- COPY -->
                <tr>
                  <td bgcolor="#111111" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                    <p style="margin: 0;">Se debera comunicar con el gimnasio  a la cual se le compro el servicio mediante mensaje de WhatsApp</p>
                  </td>
                </tr>
                <!-- COPY -->
                <tr>
                  <td bgcolor="#111111" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                    <p style="margin: 0;"><a href="https://wa.me/+549${phoneGym}/?text=Hola soy ${username} y acabo de contratar servicios en el GYM, me comunicaba para coordinar un dia y horario" target="_blank" style="color: #ff2767;">WhatsApp</a></p>
                  </td>
                </tr>
            </table>
        </td>
    </tr>
    <!-- SUPPORT CALLOUT -->
    <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="580" >
                <!-- HEADLINE -->
                <tr>
                  <td bgcolor="#ff83a8" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                    <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Necesitas ayuda?</h2>
                    <p style="margin: 0;" target="_blank" style="color: #ff2767;">Comunicate con nosotros via mails</p>
                  </td>
                </tr>
            </table>
        </td>
    </tr>
    <!-- FOOTER -->
    <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="580" >
              <!-- ADDRESS -->
              <tr>
                <td bgcolor="#f4f4f4" align="left" style="text-align: center; padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;" >
                  <p style="margin: none;">© Copyright 2022 | PG Henry  |  Grupo 11</p>
                </td>
              </tr>
            </table>
        </td>
    </tr>
</table>

</body>
</html>`;

  // Fernando gracias por tu compra!
  // Detalle de tu compra:
  // Clase de yoga x 3 x US$ 5, total US$ 15
  console.log("correoenviado");
  return bodyEmail1.concat(bodyEmail2).concat(bodyEmail3);
}

function isValidObjectId(id) {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true;
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

router.post("/emails", async (req, res, next) => {
  console.log(req.body);

  // const { user, gyms, services, price, quantity } = dataSale[0]
  // const { name, phone } = gyms
  // const nameserv = services.name
  // const username = user.name
  // const email = user.userName

  const { userDetail, gymDetail, saleDetail } = req.body;

  const { userName, email } = userDetail; //? -> username: nombre y apellido

  const { gymName, phoneGym } = gymDetail;
  // ! let body = createBodyEmail(name, nameserv, quantity, price, phone, username);
  let body = createBodyEmail(userName, gymName, phoneGym, saleDetail);
  // const { name, userName} = user
  // let body = createBodyEmail(name, product, quantity, price, phone, gyms);
  // Este body lo mandaría al item html
  // console.log('correoenviad2', body)

  // try {
  //   if (email && body) { // Una verificación que sea necesria
  //     await transporter.sendMail({
  //       from: '"Fittnet - Confirmación de compra" <fittnet.com>', // sender address
  //       to: email, // list of receivers
  //       subject: "Confirmación de compra", // Subject line
  //       html: body
  //       // html: `<b> Acá va el cuerpo del correo y puede ser un html </b>` // html body
  //     });
  //     console.log('correoenviado3')
  //     res.json({ sended: true, message: 'Correo enviado con éxito' });
  //     // Si hay que responder al front para confirmar que el correo fue enviado     
  //   }
  try {
    if (email && body) {
      // Una verificación que sea necesria
      await transporter.sendMail({
        from: '"Fittnet - Confirmación de compra" <fittnet.com>', // sender address
        to: email, // list of receivers
        subject: "Confirmación de compra", // Subject line
        html: body,
        // html: `<b> Acá va el cuerpo del correo y puede ser un html </b>` // html body
      });
      console.log("correoenviado3");
      res.json({ sended: true, message: "Correo enviado con éxito" });
      // Si hay que responder al front para confirmar que el correo fue enviado
    }
  } catch (error) {
    console.log(error);
    res.json({
      sended: false,
      message: "Ocurrió un error y el correo no ha sido envíado",
    });
  }
});

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
