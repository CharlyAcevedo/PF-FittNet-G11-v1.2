const router = require("express").Router();

const { getUser, deleteUser, updateUser } = require("../../controlers/users");
const { updateFavGym } = require("../../controlers/gyms")

router.get("/:id", getUser);
router.put('/update/:id', updateUser);
router.put(`/update/favourite/:id`, updateFavGym)

//---- CUIDADO OJO ---- ruta para borrar usuarios

router.delete("/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  const response = deleteUser(id);
  console.log(response);
  res.send(response);
});

module.exports = router;
