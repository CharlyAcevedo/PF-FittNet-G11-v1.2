
//   name: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String, 
//     required: true,
//   },
//   duration: {
//     type: Number,   
//   },
//   price: {
//     type: mongoDB.Decimal128,
//     required: true,
//   },
//   photo: {
//     type: Array,
//     of: String,
//   },
//   profileCategory: {
//     type: Array, //debe contener las caracteristicas asociadas de los avatares con el perfil del gym
//     of: String,
//   },

                        
// {
//   name,
//   lastName,
//   email,
//   phone,
//   planType, //debe llegar como un id del plan, si no llega buscar en los datos del usuario
//   cbu,
//   cuil,
//   socialNetworks, //debe llegar como un array de id
//   gyms, //debe llegar como un array de id
//   category, //debe llegar como un id
//   userActive, //si llega seria como bolean
//   paymentMethods, //debe llegar como un array de id
//   paidOut,
//   incomes, //debe llegar como un array de id
//   payments, //debe llegar como un array de id
// }

  
//-----------------------------------------------------------------------------
// A la hora de crear un gym mandamos un post a
//-----------------------------------------------------------------------------
// A qué ruta lo mandamos?
//-----------------------------------------------------------------------------
let newGym = {
    userId: "userId", // string - id del usuario partner que va a crear la el gym

    name: "Nombre del gym", // string - Campo obligatorio
    phone: 12345678, // tiene que ser un number - Campo obligatorio
    price: 399, // numero entro o decimal precio por mes
    image: ["www.imagenes/newGym.jpg"], // arreglo de string
    latitude: 0, // tiene que ser un decimal number
    longitude: 0, // tiene que ser un decimal number
    trainers: ["entrenador 1"], // arreglo de string
    logo: "www.imagenes/logo.jpg",  // string
    email: "", // string
    socialNetworks: ["Ig @newGym"], // arreglo de string      
    address: "", // string - por tener alguna dirección
}

//-----------------------------------------------------------------------------
// A la hora de editar un gym mandamos un put a
//-----------------------------------------------------------------------------
// A qué ruta lo mandamos?
//-----------------------------------------------------------------------------

let editGym = {
    gymId: "gymId", // string - id del gym que va a ser editatdo

    name: "gymName", // string - Campo obligatorio
    phone: 12345678, // tiene que ser un numero entro - Campo obligatorio
    price: 399, // numero entro o decimal precio por mes
    image: [], // arreglo de string
    latitude: 0, // tiene que ser un decimal number
    longitude: 0, // tiene que ser un decimal number
    trainers: [], // arreglo de string
    logo: "",  // string
    email: "", // string
    socialNetworks: [], // arreglo de string      
    address: "", // string - por tener alguna dirección
}

//-----------------------------------------------------------------------------
// A la hora de eliminar un gym mandamos delete a
//-----------------------------------------------------------------------------
// A qué ruta lo mandamos?
//-----------------------------------------------------------------------------

let removeGym = {
    gymId: "gymId" // El id del gym a eliminar
}



//-----------------------------------------------------------------------------
// A la hora de crear servicio mandamos un post a
//-----------------------------------------------------------------------------
// A qué ruta lo mandamos?
//-----------------------------------------------------------------------------


let newService = {
    gymId: "gymId", // string - id del gym que va a crear el servicio

    name: "serviceName", // string - Campo obligatorio
    price: 49, // numero entero - precio por hora - Campo obligatorio
    description: "service description", // tiene que ser un number - Campo obligatorio
    duration: 45, // numero entero - minutos
    photo: "url-de-la-foto-del-service.jpg", // string
}

//-----------------------------------------------------------------------------
// A la hora de editar un servicio put a
//-----------------------------------------------------------------------------
// A qué ruta lo mandamos?
//-----------------------------------------------------------------------------

let editService = {
    serviceId: "serviceId", // string - id del gym que va a crear el servicio

    name: "serviceName", // string - Campo obligatorio
    price: 49, // numero entero - precio por hora - Campo obligatorio
    description: "service description", // tiene que ser un number - Campo obligatorio
    duration: 45, // numero entero - minutos
    photo: "url-de-la-foto-del-service.jpg", // string
}

//-----------------------------------------------------------------------------
// A la hora de eliminar un servicio mandamos un delete a
//-----------------------------------------------------------------------------
// A qué ruta lo mandamos?
//-----------------------------------------------------------------------------

let removeService = {
    serviceId: "serviceId" // El id del servicio a eliminar
}
