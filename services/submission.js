const { SubmissionModel } = require('../models/submission');


const getAllSubmissionsByUser = (user) => SubmissionModel.find({ user });

const createSubmission = (submission) => SubmissionModel.create(submission);

const deleteSubmission = (id) => SubmissionModel.findByIdAndDelete(id);

const updateSubmission = (id, fields) => SubmissionModel.findByIdAndUpdate(id, fields, { new: true });


module.exports = {
    getAllSubmissionsByUser,
    createSubmission,
    deleteSubmission,
    updateSubmission
}