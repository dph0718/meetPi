
//  The geocodeAddress function returns a Promise
//  that resolves with the latitude and longitude coordinates
//  of the 'address' and 'zip code' passed in.

// PARAMETERS:
// address: the address of the location to be translated into lat/lng coordinates
// zip: the zip code of the address (in cases where duplicate street addresses exist), by default is an empty string.


let keys = require("../../keys.js");
const googleMapsClient = require('@google/maps').createClient({
    key: keys.google
});



const geocodeAddress = function (address, zip = "") {
    return new Promise(function (resolve, reject) {
        let fullAddress = address + zip;
        googleMapsClient.geocode({ address: fullAddress }, function (err, response) {
            if (err) {
                console.log(err);
                reject("Geocode Request Error.");
            }
            let coordinates = response.json.results[0].geometry.location;

            let coords = {
                latitude: coordinates.lat,
                longitude: coordinates.lng
            };
            resolve(coords);
        });
    })
};

module.exports = geocodeAddress;