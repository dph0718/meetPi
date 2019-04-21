const db = require("../models");

module.exports = {

    // Adds user
    addUser: (req, res) => {
        db.User.create(req.body);
        res.status(201).send("User created.");
    },


    // Creates Event, Responds with confirmation string.
    addEvent: (req, res) => {
        db.Event.create(req.body);
        console.log("Event created.")
        res.status(201).send("Event created.");
    },

    // Returns selected User's data
    getUser: (req, res) => {
    // req.body will have "user" property upon sign In.
    // It won't when creating an Event and searching Users in db; will be in the URI of the request
        let userId;
        if (req.body.hasOwnProperty("user")) {
            userId = req.body.user._id
        } else {
            userId = req.params.userId
        }
        db.User
            // .findOne({ _id: req.body.user._id })
            .findOne({ _id: userId })
            .then(result => {
                let user = {};
                for (let prop in result) {
                    if (prop !== "password") {
                        user[prop] = result[prop];
                    } else {
                        user[prop] = "hidden for your safety."
                    };
                };

                let returnedUser = {
                    firstName: user.firstName,
                    userName: user.userName,
                    defaultLocation: {
                        address: user.defaultLocation[0].address,
                        latitude: user.defaultLocation[0].latitude,
                        longitude: user.defaultLocation[0].longitude,
                        zip: user.defaultLocation[0].zip
                    }
                };

                res.status(202).json(returnedUser);
            });
    },
};