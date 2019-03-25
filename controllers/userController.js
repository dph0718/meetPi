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
        db.User
            .findOne({ _id: req.body.user._id })
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
                    defaultLocation: {
                        address: user.defaultLocation[0].address,
                        zip: user.defaultLocation[0].zip
                    }
                };

                res.status(202).json(returnedUser);
            });
    },



};