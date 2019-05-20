const router = require("express").Router();
const geocodeRoutes = require("./api-geocode")
const nearbyPlacesRoutes = require("./api-nearbyPlaces")


module.exports = {

    // Promise: takes [address], sends geocode request, returns lat, lng coordinates
    geocode: (address) => {

        return new Promise(function (resolve, reject) {



            // geocodeRoutes("1600 Pennsylvania Ave")
            geocodeRoutes(address)
                .then(data => {
                    let coords = {
                        lng: data.longitude,
                        lat: data.latitude,
                        name: "White Horse"
                    };

                    resolve(coords);
                });

            console.log(`Request sent, awaiting Promise...`);


        })

    },


    // Promise: takes [lat, lng, rad], sends nearbyPlaces request, returns lat, lng coordinates

    getNearbyPlaces: (lat, lng, rad) => {

            const eventLat = lat;
            const eventLng = lng;
            const eventRad = rad;

        return new Promise((resolve, reject) => {

            // let lat = parseFloat(req.params.lat);
            // let lng = parseFloat(req.params.lng);
            // let rad = parseFloat(req.params.radius);



            console.log(`nearbyPlaces request sent, awaiting Promise....`);

            nearbyPlacesRoutes(eventLat, eventLng, eventRad)
                .then(data => {
                    console.log(`nearbyPlaces request succeeded!`);
                    resolve(data)
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        })
    },
};