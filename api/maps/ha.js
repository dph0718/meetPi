
const amassNearbyLocations = require('./api-nearbyPlaces')
const geocodeAdd = require('./api-geocode.js');
console.log(`ha.`);

(amassNearbyLocations(39.6820518, -105.0253781, 2000).then((results) => {

    let concatArray = [].concat.apply([], results)

    console.log('==========================================================================================================')

    console.log(`Results.length: ${results.length}`);
    console.log(`concatArray.length: ${concatArray.length}`);


    console.log("Done.")

}));




geocodeAdd("1600 Pennsylvania Ave.").then((coords) => {
    console.log("GEO-CODED THE WHITE HOUSE:");
    console.log(coords);
});