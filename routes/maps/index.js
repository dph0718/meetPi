const router = require("express").Router();
const geocodeRoutes = require("./api-geocode")
const nearbyPlacesRoutes = require("./api-nearbyPlaces")


router.get("/geocode", (req, res) => {

    console.log(`Just the address:`);
    console.log(req.body.address);
    const address = req.body.address;

    // geocodeRoutes("1600 Pennsylvania Ave")
    geocodeRoutes(address)
        .then(data => {
            let coords = {
                lng: data.longitude,
                lat: data.latitude,
                name: "White Horse"
            };

            console.log(`Geocode request Succeeded!`);

            res.send(coords);
        });

    console.log(`Request sent, awaiting Promise...`);

})

// router.get("/nearby", (req, res) => {
router.get("/nearby/:lat/:lng/:radius", (req, res) => {
    
    let lat = parseFloat(req.params.lat);
    let lng = parseFloat(req.params.lng);
    let rad = parseFloat(req.params.radius);


    console.log(`nearbyPlaces request sent, awaiting Promise....`);

    nearbyPlacesRoutes(lat, lng, rad)
        .then(data => {
            console.log(`nearbyPlaces request succeeded!`);
            res.send(data)
        })
        .catch(err=>{
            console.log(err);
        });
});

// router.use("/geocode", geocodeRoutes);
// router.use("/nearby", nearbyPlacesRoutes);

module.exports = router;