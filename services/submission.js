const { SubmissionModel } = require('../models/submission');


const getAllSubmissionsByUser = (id) => SubmissionModel.find({ 'user.user_id': id }).sort({ createdAt: 'desc' });
const getApprovedSubmissions = () => SubmissionModel.find({ approved: true }).sort({ createdAt: 'desc' })
const getSubmittedSubmissions = () => SubmissionModel.find({ approved: false }).sort({ createdAt: 'desc' })
const createSubmission = (submission) => SubmissionModel.create(submission);
const deleteSubmission = (id) => SubmissionModel.findByIdAndDelete(id);
const updateSubmission = (id, fields) => SubmissionModel.findByIdAndUpdate(id, fields, { new: true });


module.exports = {
    getAllSubmissionsByUser,
    getApprovedSubmissions,
    getSubmittedSubmissions,
    createSubmission,
    deleteSubmission,
    updateSubmission
}