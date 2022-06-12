const { Router } = require("express");
const {
  getAllGyms,
  postGyms,
  saveGyms,
  getGymById,
  getGymByName,
} = require("../../controlers/gyms");
const {
    putService
  } = require("../../controlers/services");

const router = Router();


//----------------------------------------------------------------------------
// Para crear un solo servicio - envío el id del gym que lo crea y la info 
// para crear el el servicio
//----------------------------------------------------------------------------
// http://localhost:3001/api/partner/services/createOneService/

router.post('/createOneService/', async (req, res) => {
    console.log(req.body, 'create One Service')
  
    const { userId, gymId, dataNewService } = req.body;    
    try {     
  
      
        res.status(200).send('create One Service');
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
})
  
  
//----------------------------------------------------------------------------
// Para editar un solo servicio - envío el id del servicio y la nueva info para 
// editar el servicio
//----------------------------------------------------------------------------
// http://localhost:3001/api/partner/services/editOneService/
  
router.put('/editOneService/', async (req, res) => {
  console.log(req.body, 'edit One Service')

  const { userId, gymId, serviceId, newDataService } = req.body;

    try {     
  
      
        res.status(200).send('Edit One Service');
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
})




module.exports = router;