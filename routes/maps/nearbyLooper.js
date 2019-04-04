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
