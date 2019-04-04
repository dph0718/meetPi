require("dotenv").config();
let APIKey = process.env.KEY;
const googleMapsClient = require('@google/maps').createClient({
    key: APIKey
});

module.exports = {

    // Takes an address (and specifies by zip code) and returns an Object with latitude and longitude coordinates.
    getLatLong: (address, zip = "") => {
        let fullAddress = address + zip;
        googleMapsClient.geocode({ address: fullAddress }, function (err, response) {
            let coordinates = response.json.results[0].geometry.location;

            let coords = {
                latitude: coordinates.lat,
                longitude: coordinates.lng
            };
            return coords;
        });
    },

    doThis: (x) => {
        return null;
    },

};
