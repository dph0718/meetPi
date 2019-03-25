const apiRoutes = require("./api");
const router = require("express").Router();

router.use('/', apiRoutes);

module.exports = router;