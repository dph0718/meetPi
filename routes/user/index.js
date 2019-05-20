// Routes for accessing User data are defined here: paths from <hostroot>/user/<routeBelow>
// Controller methods are found in /controllers/userController




const router = require("express").Router();
const userControl = require("../../controllers/userController");
// const axios = require("axios");
const mapsApi = require("../../api/maps")

const geocodeRoutes = require("../maps/api-geocode")


// Performs a GET request for the user with the given id in the path.
// Returns a user object
router.get('/:userId', (req, res) => {

    // This function found within /controllers/userController
    userControl.getUser(req, res);
});

router.post(`/createUser`, (req, res) => {
    console.log(`Big Bertha , Remember her?`);
    
    // sends Geocode request with the address.
    const address = req.body.address


    mapsApi.geocode(address)
        .then(resolve => {
            // When it's been geocoded, create the user object
            const user = {
                defaultLocation: {
                    address: req.body.address,
                    latitude: resolve.lat,
                    longitude: resolve.lng
                },
                ...req.body
            };
            
            // Then make the request for adding the user to the database.
            // res.send is accomplished within addUser function (no need to res.send() anything here.)
            userControl.addUser({ body: user }, res);

        });

});


module.exports = router;