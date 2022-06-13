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
router.post('/gymcreate', async (req, res) => {
    try {    
        const response = await postGyms(req.body);
        res.status(200).send(response);
    } catch (error) {
        res.status(404).send({ error: error.message });
      }
})

module.exports = router;