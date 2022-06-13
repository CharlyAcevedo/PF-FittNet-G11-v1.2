const ObjectId = require('mongoose').Types.ObjectId
const { Router } = require("express");
const {
  getAllGyms,
  postGyms,
  saveGyms,
  getGymById,
  getGymByName
} = require("../../controlers/gyms");

const Gyms = require("../../models/Gyms");
const Users = require("../../models/User");
const Partner = require("../../models/Partner");


const router = Router();

// Para solicitar info de todos los gyms
router.get("/allgyms", async (req, res) => {
  try {
    const response = await getAllGyms();
    res.status(200).send(response);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

// router.get("/mygyms/:userId", async (req, res) => {

//   let { userId } = req.params;
  
//   // console.log(userId)

//   let partnerId = userId;

//   try {
//     let infoPartner = await Users.findById(partnerId)
    
//     if (infoPartner.partner){
//       let idInfoPartner = infoPartner.partner;

//       allGymPartner = await Partner.findById(idInfoPartner)
//       .populate({path: "gyms", populate:{path: "services"}})

//     }   
   
//     res.status(200).json(allGymPartner);
//   } catch (error) {
//     console.log(error)
//     res.status(404).send({ error: error.message });
//   }

// });

// Para solicitar info de un gym por su id
// router.get("/:id", async (req, res) => { 
//  ---> Tiene conficto con la anterior porque espera un id
router.get("/gymbyid/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getGymById(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

// Para solicitar info de un gym con su name
router.get('/gymbyname', async (req, res) => {
    try {
        const { name } = req.query;
        const response = await getGymByName(name);
        res.status(200).send(response);
    } catch (error) {
        res.status(404).send({ error: error.message });
      }
});

// Para actualizar un gym
router.put('/gymupdate', async (req, res) => {
    try {        
        const { id, data } = req.body
        const response = await saveGyms(id, data);
        res.status(200).send(response);
    } catch (error) {
      console.error(error)
        res.status(404).send({ error: error.message });
      }
}); 

// Para crear gym
router.post('/gymcreate/:idUser', async (req, res) => {
    const { idUser } = req.params;    
    try {
      console.log("llega a la ruta post gymcreate")
        const response = await postGyms(idUser, req.body);
        res.status(200).send(response);
    } catch (error) {
        res.status(404).send({ error: error.message });
      }
});

// 0 - cuando se crea un partner
// if (type === "partner") {
//   const newPartnerInfo = new Partner({ --------> se guarado esto en partner
//     name: name,
//     email: username,
//     userActive: true,
//     gyms: []
//   })
//   await newPartnerInfo.save();
//   newUser = await Users.create({
//     userName: username,
//     name: name,
//     password: promiseAll[2],
//     latitude: latitude,
//     longitude: longitude,
//     secretToken: promiseAll[1],
//     active: false,
//     type: type,
//     partner: newPartnerInfo._id //-------------------------> importante
//   });

//----------------------------------------------------------------------------
// Trae los gimnasios de un usuario partner
//----------------------------------------------------------------------------
// http:/localhost:3001/api/partner/gyms/mygyms/:userId

router.get("/mygyms/:userId", async (req, res) => {

  let { userId } = req.params;
  console.log(userId)

  try {
    let gymsPartner = await Users.findById(userId)

    
   
    res.status(200).json(gymsPartner);
  } catch (error) {
    console.log(error)
    res.status(404).send({ error: error.message });
  }

});


//----------------------------------------------------------------------------
// Para crear un solo gym - envío el id del user y la info para crear el gym
//----------------------------------------------------------------------------
// http://localhost:3001/api/partner/gyms/createOneGym

router.post('/createOneGym/', async (req, res) => {
  console.log(req.body, 'create One Gym 1')

  const { userId, dataNewGym } = req.body;
  let partnerId = userId.userId;  
  // console.log(partnerId, 'partener id');
  try {
    let addNewGym; 

    const newGym = new Gyms(dataNewGym);
    await newGym.save();
    let infoPartner = await Users.findById(partnerId)
    
    if (infoPartner.partner){
      let idInfoPartner = infoPartner.partner;

      addNewGym = await Partner.findByIdAndUpdate(idInfoPartner, 
        {$push: {gyms: newGym._id}}, 
        {new: true} );
      // console.log(infoPartner.partner, 'estoy en el if');
      // console.log(addNewGym, 'estoy en el if newGym');
      // console.log('create One Gym 3');      
    }
    
    if (addNewGym) {
      return res.status(200).json({message: 'Gimasio creado'});
      
    }

  } catch (error) {
      console.log(error, 'create One Gym');
      res.status(404).send({ error: error.message });
    }
})

// pasos para crear el gym y vincularlo al user
// 1 crear el gym
// 2 guardarlo
// 3 buscar el partner (userId) y actualizarlo


// 1 - En el modelo User cuando es partner
// partner: {
//   type: Array,
//   of: mongoose.SchemaTypes.ObjectId,
//   ref: "Partner" --------------------> hay una referencia al modelo Partner
// },

// 2 - En el modelo Partner
// gyms: {
//   type: Array,
//   of: mongoose.SchemaTypes.ObjectId,
//   ref: "Gyms", --------------------> hay una referencia al modelo Gyms
// },

// 3 - En el modelo Gym
// services: {
//   type: Array,
//   of: mongoose.SchemaTypes.ObjectId,
//   ref: "Services", ----------------> Hay una referencia al modelo Services
// }, 

// 4 - Y finalmente está services en el último lugar



//----------------------------------------------------------------------------
// Para editar un solo gym - envío el id del gym y la nueva info para editar 
// el gym
//----------------------------------------------------------------------------
// http://localhost:3001/api/partner/gyms/editOneGym

router.put('/editOneGym/', async (req, res) => {
  console.log(req.body, 'edite One Gym')

  const { gymId, newDataGym } = req.body;
  let idGym = gymId.gymId;
  let editeGym;

  console.log(req.body, ' la data del gym a editar')

  try {
    editeGym = await Gyms.findByIdAndUpdate(idGym, 
    newDataGym, {new: true})
    
    console.log(editeGym, 'luego del update')

    
      res.status(200).json({message: 'Gimnasio actualizado'});
  } catch (error) {
      res.status(404).send({ error: error.message });
    }
})



// //----------------------------------------------------------------------------
// // Para crear un solo servicio - envío el id del gym que lo crea y la info 
// // para crear el el servicio
// //----------------------------------------------------------------------------
// // http://localhost:3001/api/partner/gyms/createOneService/

// router.post('/createOneService/', async (req, res) => {
//   console.log(req.body, 'create One Service')

//   const { gymId, dataNewService } = req.body;    
//   try {     

    
//       res.status(200).send('create One Service');
//   } catch (error) {
//       res.status(404).send({ error: error.message });
//     }
// })


// //----------------------------------------------------------------------------
// // Para editar un solo servicio - envío el id del servicio y la nueva info para 
// // editar el servicio
// //----------------------------------------------------------------------------
// // http://localhost:3001/api/partner/gyms/editOneService/

// router.put('/editOneService/', async (req, res) => {
//   console.log(req.body, 'edit One Service')

//   const { serviceId, newDataService } = req.body;

//   try {     

    
//       res.status(200).send('Edit One Service');
//   } catch (error) {
//       res.status(404).send({ error: error.message });
//     }
// })

module.exports = router;