const router = require("express").Router();

const { getPartner, putPartner, getAllPartners } = require("../../controlers/partners");

router.get("/all", getAllPartners);
router.get("/:id", getPartner);
router.put("/edit/:id", putPartner);

//---- CUIDADO OJO ---- ruta para borrar usuarios

router.delete("/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  const response = deleteUser(id);
  console.log(response);
  res.send(response);
});

module.exports = router;