const router = require("express").Router();

<<<<<<< HEAD
const { getUser, deleteUser, updateUser, getUserGoogleAccount } = require("../../controlers/users");

router.get("/:id", getUser);
router.put('/update/:id', updateUser);
router.post('/', getUserGoogleAccount);
=======
const { getUser, deleteUser, updateUser } = require("../../controlers/users");
const { updateFavGym } = require("../../controlers/gyms")

router.get("/:id", getUser);
router.put('/update/:id', updateUser);
router.put(`/update/favourite/:id`, updateFavGym)

>>>>>>> 925a393fccd508e1a9128067933da785325343e2
//---- CUIDADO OJO ---- ruta para borrar usuarios

router.delete("/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  const response = deleteUser(id);
  console.log(response);
  res.send(response);
});

module.exports = router;
