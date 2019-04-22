const apiRoutes = require("./api");
const mapRoutes = require("./maps");
const eventRoutes = require("./event")
const userRoutes = require("./user")
const router = require("express").Router();

router.use('/maps', mapRoutes);
router.use('/event', eventRoutes)
router.use('/user', userRoutes)


// router.use('/', apiRoutes);

module.exports = router;