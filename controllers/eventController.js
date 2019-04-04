const db = require("../models");

module.exports = {

    // Creates event
    createEvent: (req, res) => {
        const event = {};
        for (prop in req.body) {
            event[prop] = req.body[prop];
        };
        db.Event.create(event);
        res.send(`Event created: ${req.body.eventName}`);
    },

    // Retrieves the event by Id
    // Responds with JSON of all the Event's data
    getEvent: (req, res) => {
        const id = req.body._id;
        db.Event
            .findById(id)
            .then(result => {
                res.send(result);
            });
    },

    // Removes event
    removeEvent: (req, res) => {
        let eventName;
        db.Event
            .findOne({ _id: req.body._id }, (result) => {
                eventName = result.eventName;
            })
            .findOneAndRemove({ _id: req.body._id })
            .then(() => {
                res.send("Delete was a success.")
            });
    },


};