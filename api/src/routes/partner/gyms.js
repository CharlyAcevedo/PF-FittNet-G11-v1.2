const { Router } = require("express");
const {
  getAllGyms,
  postGyms,
  saveGyms,
  getGymById,
  getGymByName
} = require("../../controlers/gyms");

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

        const response = await postGyms(idUser, req.body);
        res.status(200).send(response);
    } catch (error) {
        res.status(404).send({ error: error.message });
      }
})

//----------------------------------------------------------------------------
// Para crear un solo gym - envío el id del user y la info para crear el gym
//----------------------------------------------------------------------------
// http://localhost:3001/api/partner/gyms/createOneGym

router.post('/createOneGym/', async (req, res) => {
  console.log(req.body, 'create One Gym')

  const { userId, dataNewGym } = req.body;    
  try {     

    
      res.status(200).send('create One Gym');
  } catch (error) {
      res.status(404).send({ error: error.message });
    }
})


//----------------------------------------------------------------------------
// Para editar un solo gym - envío el id del gym y la nueva info para editar 
// el gym
//----------------------------------------------------------------------------
// http://localhost:3001/api/partner/gyms/editOneGym

router.put('/editOneGym/', async (req, res) => {
  console.log(req.body, 'edite One Gym')

  const {userId, gymId, newDataGym } = req.body;

  try {     

    
      res.status(200).send('Edit One Gym');
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