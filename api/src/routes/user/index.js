const router = require("express").Router();
const routerAvatar = require("./avatar");
const routerProfile = require("./profile");
const routerAll = require('./all')

router.use("/avatar", routerAvatar); 
router.use("/profile", routerProfile);
router.use('/all', routerAll)

router.get("/", async (req, res) => {
  try {
    res
      .status(200)
      .send(
        "Ruta /api/user"
      );
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
});

module.exports = router;
