const mongoose = require("mongoose");
const db = require("../models");

// Connect to the database so we can seed it.
mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/meetPi",
    { useNewUrlParser: true }
);

// An array of 3 dummy users to seed the DB with
const userSeed = [
    {
        userName: `dummy01`,
        password: `password`,
        email: `dummy01@email.com`,
        firstName: `Dummy`,

        defaultLocation: [{
            address: `1905 S Federal Blvd`,
            zip: 80219,
            latitude: null,
            longitude: null,
        }],

        currentLocation: [{
            address: null,
            zip: null,
            latitude: null,
            longitude: null
        }],
        events: [],
    },
    {
        userName: `dummy02`,
        password: `password`,
        email: `dummy02@email.com`,
        firstName: `Rummy`,

        defaultLocation: [{
            address: `2645 S Santa Fe Dr Ste D & E`,
            zip: 80223,
            latitude: null,
            longitude: null,
        }],

        currentLocation: [{
            address: null,
            zip: null,
            latitude: null,
            longitude: null
        }],
        events: [],
    },
    {
        userName: `dummy03`,
        password: `password`,
        email: `dummy03@email.com`,
        firstName: `Tummy`,

        defaultLocation: [{
            address: `3300 W 32nd Ave,`,
            zip: 80211,
            latitude: null,
            longitude: null,
        }],

        currentLocation: [{
            address: null,
            zip: null,
            latitude: null,
            longitude: null
        }],
        events: [],
    },

]

const eventSeed = [
    {
        eventName: "Lets Eat",
        eventAddress: "810 S Wadsworth Blvd",
        eventZip: 80226,
        eventCenter: {
            latitude: null,
            longitude: null
        },
        attendees: [001, 002, 003],
        possibilities: Array
    },
    {
        eventName: "Do Something",
        eventAddress: "211 S Holly St",
        eventZip: 80246,
        eventCenter: {
            latitude: null,
            longitude: null
        },
        attendees: [001, 002, 003],
        possibilities: Array
    },
    {
        eventName: "Do Something",
        eventAddress: "211 S Holly St",
        eventZip: 80246,
        eventCenter: {
            latitude: null,
            longitude: null
        },
        attendees: [001, 002, 003],
        possibilities: Array
    },

]

// Clearing the db, inserting the User and Event seeds.
db.User
    .deleteMany({})
    .then(() => db.User.collection.insertMany(userSeed))
    .then(() => console.log("User records inserted!"))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

db.Event
    .deleteMany({})
    .then(() => db.Event.collection.insertMany(eventSeed))
    .then(data => {
        console.log("Event records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);

    });
