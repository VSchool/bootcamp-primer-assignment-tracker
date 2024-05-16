const ex = require('express');
const { getAllSubmissions } = require('../services/submission');

const adminRouter = ex.Router();

adminRouter.get('/submissions', async (req, res, next) => {
    const { first_name, last_name, email, sortBy, order, approved, assignment } = req.query;

    const filters = {
        ...(first_name && { 'user.first_name': new RegExp(first_name, 'i') }),
        ...(last_name && { 'user.last_name': new RegExp(last_name, 'i') }),
        ...(email && { 'user.email': new RegExp(email, 'i') }),
        ...(approved && { approved: approved === 'true' }),
        ...(assignment && {assignment: new RegExp(assignment, 'i')})
    }
    const sort = {
        [sortBy || 'createdAt']: order || 'desc'
    };

    try {
        const results = await getAllSubmissions(filters, sort);
        res.status(200).send({ success: true, results, count: results.length })
    } catch (err) {
        console.error(err)
        res.status(500)
        next(err.message)
    }
})


module.exports = {
    adminRouter
}