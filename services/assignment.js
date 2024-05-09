const { AssignmentModel } = require('../models/assignment');

const getAllAssignments = () => AssignmentModel.find().sort({sortKey: 'asc'});

module.exports = {
    getAllAssignments
}