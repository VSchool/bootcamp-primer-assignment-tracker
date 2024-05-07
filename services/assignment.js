const { AssignmentModel } = require('../models/assignment');

const getAllAssignments = () => AssignmentModel.find();

module.exports = {
    getAllAssignments
}