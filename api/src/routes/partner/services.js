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
const Service = require("../../models/Service");

const router = Router();



//----------------------------------------------------------------------------
// Para crear un solo servicio - envío el id del gym que lo crea y la info 
// para crear el el servicio
//----------------------------------------------------------------------------
// http://localhost:3001/api/partner/services/createOneService/

router.post('/createOneService/', async (req, res) => {
  // gymId, dataNewService
  const { gymId, dataNewService } = req.body;

  let idGym = gymId.gymId;

  console.log(req.body, 'el body que recibo')

  try {
    let addNewService;
    const newService = new Service(dataNewService);
    await newService.save();

    // Ver si hay que agregar una verificación o validación

    addNewService = await Gyms.findByIdAndUpdate(idGym,
      { $push: { services: newService._id } },
      { new: true });

    console.log(addNewService, ' cuado creo y agrego el servicio al gym');

    if (addNewService) {
      return res.status(200).json({ message: 'Servicio creado' });
    }

  } catch (error) {
    console.log(error)
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
  // serviceId, newDataService 
  const { serviceId, newDataService } = req.body;
  let idService = serviceId.serviceId;

  let editeService;

  try {
    // console.log(idService, 'el id del service a editar')
    // console.log(newDataService, ' la data del service a editar')

    editeService = await Service.findByIdAndUpdate(idService, 
      newDataService, {new: true})
  
    // console.log(editeService, 'luego del update')


    res.status(200).json({message: 'Servicio actualizado'});
  } catch (error) {
    console.log(error);
    res.status(404).send({ error: error.message });
  }
})




module.exports = router;