const router = require("express").Router();

const { findAllUsers } = require("../../controlers/users");

router.get("/", async (req, res) => {
    console.log('si llega a la ruta')
    try {
        const response = await findAllUsers();
        res.status(200).send(response)
    } catch (error) {
        res.status(error.status).send({ msg: error.message })
    }
});

module.exports = router;