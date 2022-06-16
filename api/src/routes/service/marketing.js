const router = require("express").Router();
const Users = require('../../models/User');


router.get("/allusers", async (req, res) => {

    try {
      let pipeline = { $match: { type: "user" } };
  
      let allUsers = await Users.aggregate([pipeline,      
        {
          $project: {
            _id: 1,
            active: 1,
          }
        }]).sort({ name: 'asc', test: -1 });
  
      // console.log(allUsers, 'todos los user')
  
      res.json(allUsers);
  
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  });

  module.exports = router;