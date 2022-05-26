const { Router } = require('express');

const cookieparser = require('cookie-parser');
const router = Router();
router.use(cookieparser()); // veremos


// Este array simula ser la base de datos a consultar.
// Queda pendiente hacer las consultas directamente a la base de datos.

const users = [
    {id: 1, name: 'Franco', email: 'Franco@mail.com', password: '1234'},
    {id: 2, name: 'Toni', email: 'Toni@mail.com', password: '1234'}
]

// Esta función simula la busquda del correo en la base de datos para 
// intentar encontrar el usuario con ese correo.
// Queda pendiente utilizar mongose para hacer la consulta
// y enviar la función a controller.

router.findByUsername = function(email, cb) {
      return new Promise(function (resolve, reject) {
      let user = users.find( u => u.email === email)

      console.log(user, ' linea 18 de register')

      if (user) {
        console.log(user, ' cómo devuelve la promesa a user 20')
        return resolve(user);
      }
      
      return reject(null);
    });
}

// Esta función simula la busquda por id en la base de datos para 
// intentar encontrar el usuario con ese correo.
// Queda pendiente utilizar mongose para hacer la consulta
// y enviar la función a controller.

router.findById = function(id, cb) {
  console.log(id, 'llegó el id 30 register')

  return new Promise(function (resolve, reject) {
    let user = users.find( u => u.id === Number(id))
    
    if (user) {
      (user, ' cómo devuelve la promesa a user 34')
      return resolve(user);
    }
    
    return reject(null);
  });

}

// Esta función evalua si estoy autenticado, es decir si tengo una sesión
// activa, y si la tengo no me deja continuar con el post a /api/register,
// solo me deja hacerlo si no tengo una sesión iniciada.
function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    res.redirect('/api/register');
  } else {
    next();
  }
}

// Esta ruta get responde cuando un usuario con sesión activa intenta
// hacer un post a /api/register.
router.get('/register', (req, res, next) => {
    res.send('No puede realizar un post /register mientras su sesión esté iniciada');
    
})


// Esta ruta post recibe request para crear nuevos usuarios en la base de datos.

router.post('/register', isAuthenticated, (req, res, next) => {
    
  //También debería recibir tipo de usuario "client" o "partner"
  const { name, email, password } = req.body;

  console.log(name, email, password, 'lo que llega por body')
  
  if ( !name || !email || !password ) {
      return res.send('campos incompletos');
  }
  if ( name && email && password ) {

    let findUser = users.find(u => u.email === email)
    // Acá iría a buscar el email del user en la db

    let id = users.length + 1 ; // Genero un id

    if (findUser ) { // Si el correo ya existe
      console.log('Email incorrecto, por favor indique otro correo');
      return  res.send('Email incorrecto, por favor indique otro correo');
      
    } else { // Si no el correo en bd, lo creo el usuario

      users.push({id, name, email, password}); 
      // Acá debería crear el user en la db
      // y retornar un mensaje de usuario creado con éxito
      // por ahora devuelvo el user creado
      res.status(200).json(users[users.length - 1])
    }        

   } else {
    
    res.send('Datos incompletos, el registro no fue creado ');
      
  }

})



module.exports = router;

