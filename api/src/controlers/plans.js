const mongoose = require('mongoose');
const Plan = require('../models/Plan');

const getPlans = async (req, res) => {
    try {
        const allPlans = await Plan.find()
        res.send(allPlans)

    } catch (error) {
        console.error(error);
        res.status(error.status).send(error.message)
    }
};

const postPlans = async (req, res) => {
    const plan = req.body;
    try {
        const newPlan = new Plan(plan);
        newPlan.save();
        res.send(newPlan)

    } catch (error) {
        console.error(error);
        res.status(error.status).send(error.message)
    }
};

const putPlans = async (req, res) => {
    const { id } = req.params;
    const plan = req.body;
    try {
        
        const userUpdeted = await Plan.findByIdAndUpdate(id, plan, { new: true });
        res.send(userUpdeted)

    } catch (error) {
        console.error(error);
        res.status(error.status).send(error.message)
    }
};


module.exports = { getPlans, postPlans, putPlans }