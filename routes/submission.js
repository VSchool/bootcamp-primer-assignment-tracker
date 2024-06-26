const ex = require('express');
const { getAllSubmissionsByUser, createSubmission, deleteSubmission, updateSubmission, getApprovedSubmissions, getSubmittedSubmissions } = require('../services/submission');
const { setUserProfile } = require('../middleware/auth');

const submissionRouter = ex.Router();

submissionRouter.get('/', async (req, res, next) => {
    try {
        const results = await getAllSubmissionsByUser(req.auth.payload.sub);
        res.status(200).send({ success: true, results })
    } catch (err) {
        console.error(err)
        res.status(500)
        next(err.message)
    }
})

submissionRouter.post('/', setUserProfile, async (req, res, next) => {
    try {
        const results = await createSubmission({ ...req.body.submission, user: req.auth.profile });
        res.status(200).send({ success: true, results })
    } catch (err) {
        console.error(err)
        res.status(500)
        next(err.message)
    }
})

submissionRouter.delete('/:id', async (req, res, next) => {
    try {
        const results = await deleteSubmission(req.params.id);
        res.status(200).send({ success: true, results })
    } catch (err) {
        console.error(err)
        res.status(500)
        next(err.message)
    }
})

submissionRouter.put('/:id', async (req, res, next) => {
    try {
        const results = await updateSubmission(req.params.id, req.body.submission);
        res.status(200).send({ success: true, results })
    } catch (err) {
        console.error(err)
        res.status(500)
        next(err.message)
    }
})


module.exports = {
    submissionRouter
}