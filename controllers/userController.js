const db = require("../models");

module.exports = {

    // Creating User
    addUser: (req, res) => {

        db.User.create(req.body);
        res.status(200).send(`User ${req.body.firstName} created.`);
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
                    id: user._id,
                    firstName: user.firstName,
                    userName: user.userName,
                    defaultLocation: {
                        address: user.defaultLocation.address,
                        latitude: user.defaultLocation.latitude,
                        longitude: user.defaultLocation.longitude,
                        zip: user.defaultLocation.zip
                    }
                };

                res.status(200).json(returnedUser);
            });
    },

    updateUserEvents: (req, res) => {
        let userId = req.body.userId;
        let eventId = req.body.eventId
        db.User.updateOne({ _id: userId }, { $push: { events: eventId } })
            .then(x => {
                console.log(`User ${userId} successfully added Event ${eventId}!`);
            });
    }
};