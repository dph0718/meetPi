// Allows getting sensitive info from .env file.
require("dotenv").config();
const placesPromise = require("./getNearbyPlacesPromise");


// Grab the hidden API key
let APIKey = process.env.KEY;

// Use this thing to use my API key with all used Google APIs
const googleMapsClient = require('@google/maps').createClient({
    key: APIKey
});

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


// Google's Places Objects are stored under: response.json.results
// Example response.json.results object:
let sampleObject = {
    geometry: { location: [Object], viewport: [Object] },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
    id: '1dd842bf5629b30f8905c80d6b84960a18deca41',
    name: 'McDonald\'s',
    opening_hours: { open_now: true },
    photos: [[Object]],
    place_id: 'ChIJCxjVaY9_bIcRAtCO8WjOQ8E',
    plus_code:
    {
        compound_code: 'MXJF+QR Denver, Colorado, United States',
        global_code: '85FPMXJF+QR'
    },
    price_level: 1,
    rating: 3.2,
    reference: 'ChIJCxjVaY9_bIcRAtCO8WjOQ8E',
    scope: 'GOOGLE',
    types:
        ['cafe',
            'store',
            'restaurant',
            'point_of_interest',
            'food',
            'establishment'],
    user_ratings_total: 794,
    vicinity: '1905 South Federal Boulevard, Denver'
}

// Example results.geometry object (instead of [Object] in sampleObject):
let sampleGeometry = {
    location: { lat: 39.6825991, lng: -105.0247121 },
    viewport:
    {
        northeast: { lat: 39.6839733802915, lng: -105.0233641197085 },
        southwest: { lat: 39.6812754197085, lng: -105.0260620802915 }
    }
}

// Takes an address (and specifies by zip code) and returns an Object with latitude and longitude coordinates.
function getLatLong(address, zip = "") {
    let fullAddress = address + zip;
    googleMapsClient.geocode({ address: fullAddress }, function (err, response) {
        let coordinates = response.json.results[0].geometry.location;

        let coords = {
            latitude: coordinates.lat,
            longitude: coordinates.lng
        };
        return coords;
    });
};

// UNNECESSARY -  OR NEEDS TO BE MORE ROBUST for low response CASES -- low response should be assumed first.
// Returns the first "type" that's also included in our relevant place types array:
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

// Valid "types" in Google Places: https://developers.google.com/places/supported_types?utm_source=google&utm_medium=cpc&utm_campaign=FY18-Q2-global-demandgen-paidsearchonnetworkhouseads-cs-maps_contactsal_saf&utm_content=text-ad-none-none-DEV_c-CRE_315916117616-ADGP_Hybrid+%7C+AW+SEM+%7C+BKWS+~+Google+Maps+Place+Types-KWID_43700039136946138-aud-581578347266:kwd-582432945315-userloc_9028789&utm_term=KW_google%20places%20types-ST_google+places+types&gclid=CPT7itGIqeECFYGvZQodCAYDNw
// ["bar","cafe", "casino", "movie_theater", "park", "restaurant", "shopping_mall", "zoo"]


// th Place constructor function
class Place {
    constructor(e) {
        this.name = e.name,
            this.types = e.types,
            this.latitude = e.geometry.location.lat,
            this.longitude = e.geometry.location.lng,
            this.address = e.vicinity,

            this.numRatings = e.user_ratings_total
    };
};


// getNearbyPlacesA(39.6820518, -105.0253781, 200);
let piledPromise = Promise.all([
    placesPromise(39.6820518, -105.0253781, 4000, "restaurant"),
    placesPromise(39.6820518, -105.0253781, 4000, "bar")
])
    .then((values) => {
        // Do something with all the values that are returned
        values.forEach(function (resolution, iR) {
            resolution.forEach((place, iP) => {
                console.log(place.name)
                let newPlace = new Place(place);
                console.log(newPlace);
                console.log(`===================================================================================================================`);


            })
        })
        // console.log(`AND THEN: ${vals}`);
    })
