const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: String,
    userName: String,
    password: String,
    email: String,
    firstName: String,

    defaultLocation: [{
        address: String,
        zip: Number,
        latitude: Number,
        longitude: Number
    }],

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