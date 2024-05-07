const ex = require('express');
const { assignmentRouter } = require('./assignment');
const { submissionRouter } = require('./submission');


const apiRouter = ex.Router();

apiRouter.use('/assignments', assignmentRouter);
apiRouter.use('/submissions', submissionRouter);


module.exports = {
    apiRouter
}