// require dependencies
// express
// routes
// 
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();


// Define static folder to use
// Development vs production environments
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
} else {
    app.use(express.static('public'));
};





app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);


// Connect to the database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/meetPi", {useNewUrlParser: true});


// Server, begin taking orders
const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
    console.log(`🌎 ==> API Server now listening on PORT ${PORT}!`);
});
