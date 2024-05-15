const mg = require('mongoose');

const SubmissionSchema = new mg.Schema({
    assignment: { type: String, required: true },
    user: {
        user_id: { type: String, required: true },
        first_name: String,
        last_name: String,
        email: String
    },
    link: { type: String, required: true },
    approved: { type: Boolean, default: false },
}, {
    timestamps: true
});

const SubmissionModel = mg.model('Submission', SubmissionSchema);

module.exports = {
    SubmissionModel
}

