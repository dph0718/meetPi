const mongoose = require("mongoose");
const db = require("../models");

console.log(`That's a good boy.`);

mongoose.connect(
        process.env.MONGODB_URI ||
    "mongodb://localhost/meetPi",
    { useNewUrlParser: true }
);

db.User
    .deleteMany({})
    .then(data => {
        console.log("All User records removed!");
        // process.exit(0);
    })
    .then(()=>{
        
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

db.Event
    .deleteMany({})
    .then(data => {
        console.log("All Event records removed!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
