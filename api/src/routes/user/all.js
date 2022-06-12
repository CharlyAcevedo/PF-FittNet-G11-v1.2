const router = require("express").Router();
const run = require("../../controlers/test")
//const deleteDesease = require("../../controlers/test")
const Diseases = require('../../models/Diseases')
const DiseasesType = require('../../models/DiseasesType')

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



router.get("/deleteDesease/:id", async (req, res) => {
    console.log('si llega a la ruta')
        try {
            const { id } = req.params;
            const response = await run(id);
            console.log(response);
            res.status(200).send(response);
        } catch (error) {
            res.status(error.status).send({ msg: error.message });
        }

    });

router.get("/findDeseaseType/", async (req, res) => {
    try {
        const types = await DiseasesType.find()
        res.status(200).send(types);
    } catch (error) {
        res.status(error.status).send({ msg: error.message });
    }
    
})

router.get("/createDeseaseType/", async (req, res) => {
        console.log('si llega a la ruta')
            try {
                const { id } = req.params;
                const response = await run(id);
                console.log(response);
                res.status(200).send(response);
            } catch (error) {
                res.status(error.status).send({ msg: error.message });
            }
    
        });




/* router.get("/deseases", async (req, res) =>{
    try {
        const resp = await run()
    res.status(200).send("desease created")
    } catch (error) {
        res.status(error.status).send({ msg: error.message })
    }
    
}) */
router.get("/deseases/", async (req, res) =>{
    try {
        //const resp = await run()
    res.status(200).send("desease created")
    } catch (error) {
        res.status(error.status).send({ msg: error.message })
    }
    
})

router.get("/deseasesMap", async (req, res) =>{
    try {
        const resp = await DiseasesType.find()
       // const deseasesTypes = resp.map(e => e.deseaseName)
        //const desases= new Set(desease)
    res.status(200).send(resp)
    } catch (error) {
        res.status(error.status).send({ msg: error.message })
    }
    
})

module.exports = router;

