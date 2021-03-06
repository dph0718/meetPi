
//  The getAllPlaces function returns a Promise
//  that resolves with an array (of the arrays) of all Places objects found,
//  collected from its Promise.all() function,
// which is a series of promises that each resolve with results of a specific Place "type" search
// each of which is defined by the values in the validPlaceTypes array.

// PARAMETERS:
// lat: latitude of midpoint
// lng: longitude of midpoint
// radius: the radius, in meters, of the area around the midpoint to search




// Allows getting sensitive info from .env file.
require("dotenv").config();
const promiseArray = require("./nearbyLooper");

// Valid "types" in Google Places: https://developers.google.com/places/supported_types?utm_source=google&utm_medium=cpc&utm_campaign=FY18-Q2-global-demandgen-paidsearchonnetworkhouseads-cs-maps_contactsal_saf&utm_content=text-ad-none-none-DEV_c-CRE_315916117616-ADGP_Hybrid+%7C+AW+SEM+%7C+BKWS+~+Google+Maps+Place+Types-KWID_43700039136946138-aud-581578347266:kwd-582432945315-userloc_9028789&utm_term=KW_google%20places%20types-ST_google+places+types&gclid=CPT7itGIqeECFYGvZQodCAYDNw
// Only interested in these, though:
const validPlaceTypes = [
    "bar",
    "casino",
    "movie_theater",
    "restaurant",
    "cafe",
    "park",
    "shopping_mall",
    // "museum",
    // "zoo"
];

// UNNECESSARY -  or needs to be MORE ROBUST for low # of response cases -- low response should be assumed first.
// Returns the first "type" that's also included in our relevant place types array:
// Make this function just detect any place type, and store all the place types.
//  THEN, it can be included in the module.exports
function detectPlaceType(thePlaceTypes) {
    let type = "";
    let valid = false;

    validPlaceTypes.forEach((e, i) => {
        if (valid === false) {
            type = thePlaceTypes.find((el) => el == e);
            if (type) {
                valid = true;
            }
            else {
                type = undefined;
            };
        };
    });
    return type;
};



// Place constructor 
class Place {
    constructor(e) {
        this.id = e.id,
            this.name = e.name,
            this.types = e.types,
            this.latitude = e.geometry.location.lat,
            this.longitude = e.geometry.location.lng,
            this.opening_hours = e.opening_hours,
            this.address = e.vicinity,
            this.numRatings = e.user_ratings_total
    };
};


// This exported function returns a Promise that can have a .then((results)=>{}) method called, 
// with the "results" passed in being the valuesArray (an array of (validPlaceTypes.length) (7) type-specific-arrays)
const getAllPlacesFunction = function (lat, lng, radius) {
    // let nearbyPlacesPromiseA = Promise.all(promiseArray(validPlaceTypes, 39.6820518, -105.0253781, 2000))
    return new Promise(function (resolve, reject) {
        let nearbyPlacesPromiseA = Promise.all(promiseArray(validPlaceTypes, lat, lng, radius))
            .then((typesResults) => {

                let typesResultsArray = typesResults.map(typeRes => {
                    return {
                        type: typeRes.type,
                        exists: typeRes.exists,
                        places: typeRes.places.map(place => new Place(place))
                    }
                })

                resolve(typesResultsArray);
            })
            .catch(err => {
                console.log(err);
            });
    });
};



module.exports = getAllPlacesFunction;