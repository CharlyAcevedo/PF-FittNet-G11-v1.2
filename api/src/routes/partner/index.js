const router = require("express").Router();
const routerProfile = require('./profile');
const routerGyms = require('./gyms');
const routerServices = require('./services');
const routerSales = require("./sales");

router.use("/gyms", routerGyms);
router.use("/services", routerServices); 
router.use("/profile", routerProfile);
router.use("/sales", routerSales);

router.get("/", async (req, res) => {
  try {
    res
      .status(200)
      .send(
        "Ruta /api/Partner"
      );
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
});

module.exports = router;