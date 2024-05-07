const ex = require('express');
const { getAllAssignments } = require('../services/assignment');

const assignmentRouter = ex.Router();

assignmentRouter.get('/', async (req, res, next) => {
    try {
        const results = await getAllAssignments();
        res.status(200).send({ success: true, results })
    } catch(err){
        console.error(err)
        res.status(500)
        next(err.message)
    }
})


module.exports = {
    assignmentRouter
}