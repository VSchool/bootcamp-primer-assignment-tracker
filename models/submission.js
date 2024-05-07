const mg = require('mongoose');

const SubmissionSchema = new mg.Schema({
    assignment: { type: String, unique: true },
    user: String,
    link: String
});

const SubmissionModel = mg.model('Submission', SubmissionSchema);

module.exports = {
    SubmissionModel
}

