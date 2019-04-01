const apiRoutes = require("./api");
const mapRoutes = require("./maps")
const router = require("express").Router();

router.use('/', apiRoutes);
router.use('/maps', mapRoutes);

module.exports = router;