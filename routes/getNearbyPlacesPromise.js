let APIKey = process.env.KEY;
const googleMapsClient = require('@google/maps').createClient({
    key: APIKey
});


// This Promise returns the results of the nearbyPlaces API request. Parameters:
    // REMOVED - foundArray: the array the response is pushed to (may not be needed - may be returned in the importing file's Promise.all() function, and pushed in the .then() method)
    // lat: latitude
    // lng: longitude
    // radius: the radius, in meters, of the search area from the given lat/lng
    // 
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
            opennow: true,
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
