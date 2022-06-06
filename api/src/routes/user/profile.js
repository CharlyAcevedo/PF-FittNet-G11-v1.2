const router = require("express").Router();

const { getUser, deleteUser, updateUser } = require("../../controlers/users");

router.get("/:id", getUser);
router.put('/update/:id', updateUser);

//---- CUIDADO OJO ---- ruta para borrar usuarios

router.delete("/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  const response = deleteUser(id);
  console.log(response);
  res.send(response);
});

module.exports = router;
