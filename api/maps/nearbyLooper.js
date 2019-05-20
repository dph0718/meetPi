// The loopThruTypes function returns an array of Promises:
// each Promise resolves with Places data for a given 'type' of establishment (defined by, & imported from ./getNearbyPlacesPromise).
// The array of Promises is then passed into a Promise.all() function (within ./api-nearbyPlaces) to return all results synchronously.



require("dotenv").config();
const placesPromise = require("./getNearbyPlacesPromise");



// Loops through valid types and returns an array of promises to fetch nearby Places
const loopThruTypes = (typesArray, lat, lng, radius) => {
    let promiseArray = [];
    typesArray.forEach((e, i) => {

        let newPromise = placesPromise(lat, lng, radius, e);
        promiseArray.push(newPromise)
    });
    return promiseArray;
};


module.exports = loopThruTypes;
