const router = require("express").Router();
const run = require("../../controlers/test")
const Diseases = require('../../models/Diseases')

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






router.get("/deseases", async (req, res) =>{
    try {
        const resp = await run()
    res.status(200).send("desease created")
    } catch (error) {
        res.status(error.status).send({ msg: error.message })
    }
    
})

router.get("/deseasesMap", async (req, res) =>{
    try {
        const resp = await Diseases.find()
        const desease = resp.map(e => e.desease)
    res.status(200).send(desease)
    } catch (error) {
        res.status(error.status).send({ msg: error.message })
    }
    
})

module.exports = router;

