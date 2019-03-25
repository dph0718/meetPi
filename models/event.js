const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    eventName: String,
    eventAddress: String,
    eventZip: Number,
    eventCenter: {
        latitude: Number, 
        longitude: Number
    },
    attendees: Array,
    possibilities: Array
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;