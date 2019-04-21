const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: String,
    userName: String,
    password: String,
    email: String,
    firstName: String,

    // User's assumed location without location enabled.
    defaultLocation: {
        address: String,
        zip: Number,
        latitude: Number,
        longitude: Number
    },

    // User's current location IF location enabled
    currentLocation: {
        address: String,
        zip: Number,
        latitude: Number,
        longitude: Number
    },

    // Array of event Id's
    events: Array,

});


const User = mongoose.model("User", UserSchema);

module.exports = User;