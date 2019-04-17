
// The getNearbyPlaces function returns a Promise
// that resolves with the Places data 
// based on the 'type' of establishment searched for

// PARAMETERS:
// lat: latitude of midpoint
// lng: longitude of midpoint
// radius: the radius, in meters, of the area around the midpoint to search
// type: the type of place being queried ("bar", "restaurant", etc...)


let key = require("../../keys.js").google;
const googleMapsClient = require('@google/maps').createClient({
    key: key
});


// This Promise returns the results of the nearbyPlaces API request. Parameters:

const getNearbyPlaces = function (lat, lng, radius, type) {
    console.log("PLACES KEY:");
    

    console.log(key);
    
    lat = parseFloat(lat);
    long = parseFloat(lng);

    return new Promise(function (resolve, reject) {
        googleMapsClient.placesNearby({
            location: { lat: lat, lng: lng },
            radius: radius,
            type: type,
            // opennow: true,
        },
            function (err, response) {
                if (err) {
                    console.log(err);
                    reject("NearbyPlaces Request Error");
                }            
                console.log(`Resolved the ${type} search with ${response.json.results.length} results returned`);
                resolve(response.json.results);
            });
    });
};





module.exports = getNearbyPlaces;
