const db = require("../models");

module.exports = {

    // Creates event
    createEvent: (req, res) => {
        const event = {};
        for (prop in req.body) {
            user[prop] = prop;
        };
        console.log(event);
        db.Event.create(event);
        res.send(`Event created: ${req.body.eventName}`);
    },

    // Retrieves the event by Id
    // Responds with JSON of all the Event's data
    getEvent: (req, res) => {
        // Which event was clicked to view?
        // grab the event id data from the user's 
        console.log(`getEvent req.body:`);
        console.log(req.body);;

        const id = req.body._id;
        db.Event
            .findById(id)
            .then(result => {
                console.log(`Event data being delivered to client...`);
                console.log(result);
                res.send(result);
            });
    },

    // Removes event
    removeEvent: (req, res) => {
        let eventName;
        db.Event
            .findOne({ _id: req.body._id }, (result) => {
                console.log("Found sought record");
                eventName = result.eventName;
            })
            .findOneAndRemove({ _id: req.body._id })
            .then(() => {
                console.log(`${eventName} has been deleted.`)
                res.send("Delete was a success.")
            })
    },


};