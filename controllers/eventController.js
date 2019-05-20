const db = require("../models");

module.exports = {

    // Creates event
    createEvent: (req, cb) => {
        const event = {};
        for (prop in req.body) {
            event[prop] = req.body[prop];
        };
        db.Event.create(event)
            .then(newEvent => {
                console.log(`Event created: ${req.body.eventName}`);
                cb(newEvent)
            });

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

    updateEvent: (event, cb) => {
        const id = event.id;
        const location =event.location;
        db.Event
            .findOneAndUpdate({ _id: id }, { eventAddress: location })
            .then((x) => {
                console.log(`Address successfully added: ${location}`);
                cb(x)
            })
    }

};