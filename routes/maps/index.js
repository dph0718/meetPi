const router = require("express").Router();
const geocodeRoutes = require("./api-geocode")
const nearbyPlacesRoutes = require("./api-nearbyPlaces")

router.use("/geocode", geocodeRoutes);
router.use("/nearby", nearbyPlacesRoutes);

module.exports = router;