const router = require("express").Router();
const geocodeRoutes = require("./api-geocode")
const nearbyPlacesRoutes = require("./api-nearbyPlaces")


router.get("/geocode", (req, res) => {

    console.log(req.body);
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

router.get("/nearby", (req, res) => {
    console.log(`nearbyPlaces request sent, awaiting Promise....`);
    console.log(req.body);
    
    nearbyPlacesRoutes(38.8791765, -76.98181269999999, 1000)
        .then(data => {
            console.log(`nearbyPlaces request succeeded!`);
            
            res.send(data)
        })
});

// router.use("/geocode", geocodeRoutes);
// router.use("/nearby", nearbyPlacesRoutes);

module.exports = router;