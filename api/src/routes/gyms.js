const { Router } = require("express");
const {
  getAllGyms,
  postGyms,
  saveGyms,
  getGymById,
  getGymByName
} = require("../controlers/gyms");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const response = await getAllGyms();
    res.status(200).send(response);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
      const { id } = req.params;
    const response = await getGymById(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

router.get('/', async (req, res) => {
    try {
        const { name } = req.query;
        const response = await getGymByName(name);
        res.status(200).send(response);
    } catch (error) {
        res.status(404).send({ error: error.message });
      }
});

router.put('/', async (req, res) => {
    try {        
        const response = await saveGyms(req.body);
        res.status(200).send(response);
    } catch (error) {
        res.status(404).send({ error: error.message });
      }
});

router.post('/', async (req, res) => {
    try {    
        const response = await postGyms(req.body);
        res.status(200).send(response);
    } catch (error) {
        res.status(404).send({ error: error.message });
      }
})

module.exports = router;