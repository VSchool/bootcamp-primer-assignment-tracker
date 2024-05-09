const mg = require('mongoose');

const SubmissionSchema = new mg.Schema({
    assignment: { type: String, required: true },
    user: { type: String, required: true },
    link: { type: String, required: true },
    approved: { type: Boolean, default: false },
});

const SubmissionModel = mg.model('Submission', SubmissionSchema);

module.exports = {
    SubmissionModel
}

