const ex = require('express');
const path = require('path');

const staticSiteRouter = ex.Router();

staticSiteRouter.use((req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'))
})

module.exports = {
    staticSiteRouter
}