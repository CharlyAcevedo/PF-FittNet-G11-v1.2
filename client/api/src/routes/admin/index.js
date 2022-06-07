const router = require("express").Router();

router.get("/", async (req, res) => {
    try {
      res
        .status(200)
        .send(
          "Ruta /api/admin"
        );
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  });

module.exports = router;