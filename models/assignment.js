const mg = require('mongoose');

const AssignmentSchema = new mg.Schema({
    name: String,
    url: String,
    identifier: { type: String, unique: true },
    prerequisite: String,
    sortKey: {type: Number, required: true}
});

const AssignmentModel = mg.model('Assignment', AssignmentSchema);

module.exports = {
    AssignmentModel
}

