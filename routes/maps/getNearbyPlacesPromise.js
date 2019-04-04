
require("dotenv").config();
let APIKey = process.env.GOOGLE_API_KEY;
const googleMapsClient = require('@google/maps').createClient({
    key: APIKey
});


// This Promise returns the results of the nearbyPlaces API request. Parameters:
// lat: latitude
// lng: longitude
// radius: the radius, in meters, of the search area from the given lat/lng
// type: the type of place being queried ("bar", "restaurant", etc...)

const getNearbyPlaces = function (lat, lng, radius, type) {

    lat = parseFloat(lat);
    long = parseFloat(lng);

    return new Promise(function (resolve, reject) {
        console.log(`in Promise Before API call:`);
        googleMapsClient.placesNearby({
            location: { lat: lat, lng: lng },
            radius: radius,
            type: type,
            // opennow: true,
        },
            function (err, response) {
                if (err) {
                    console.log(err);
                }            
                console.log(`Resolved the ${type} search with ${response.json.results.length} results returned`);
                resolve(response.json.results);
            });
    });
};





module.exports = getNearbyPlaces;
