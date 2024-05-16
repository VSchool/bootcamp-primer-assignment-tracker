const ex = require('express');
const { assignmentRouter } = require('./assignment');
const { submissionRouter } = require('./submission');
const { adminRouter } = require('./admin');


const apiRouter = ex.Router();

apiRouter.use('/assignments', assignmentRouter);
apiRouter.use('/submissions', submissionRouter);
apiRouter.use('/admin', adminRouter);


module.exports = {
    apiRouter
}