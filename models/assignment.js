const mg = require('mongoose');

const AssignmentSchema = new mg.Schema({
    name: String,
    url: String,
    identifier: { type: String, unique: true },
    prerequisite: String
});

const AssignmentModel = mg.model('Assignment', AssignmentSchema);

module.exports = {
    AssignmentModel
}

