// router defines GET, POST, etc. routes.
const router = require("express").Router();
const userController = require("../controllers/userController");
const eventController = require("../controllers/eventController")
// router.get(a, b) handles the GET requests (like app.get(), but more localized to this file)
// a is a String representing the url path requested. assuming your domain is domain.com, 
// the route below will handle requests to "www.domain.com/login"
// b is the callback function where the request will be handled and a response generated.
//  Express will use the 'req' argument to represent the request {any information sent from the client, as an object:
// like username, password, variables within the pathname itself (req.params.variable)}

// That callback function'll then use the "res" object to call a method that takes a response action.
//  
// Although it's "POST", it gets user data.

// Creates user upon signup
router.post('/createUser', userController.addUser);
// Retrieves user's data
router.post("/userDashboard", userController.getUser);
// Deletes an Event
router.delete('/removeEvent', eventController.removeEvent);
// Creates an Event
router.post("/createEvent", eventController.createEvent);
// Retrieves Event data
router.post("/eventDetail", eventController.getEvent);



router.get("/vote/:eventId", (req, res) => {
    console.log(`I voted.`);
    console.log(req.params.eventId);
    res.json('Fabulous.')
    // find the Event
    // Find the potentials of the event
    // Add the vote to the Potential object
    // Disable user from voting again.
});


// Catch all Route
router.get("/*", (req, res) => {
    res.send("You have made a very success.")
});
// Order of things to make this work:
// Event List page 
// Retrieve from the User, all User's event, 
// Retrieve from the associated Events (event title, address (if determined), center location (if determined) attendee's names) (1-10?) to display it

// Event Creation page
// POST User's event data.
// POST to invitees' invitations.
// Retrieve from Users, invitees' lat/long 
// [ ] If a friend
// Calculate average latitude/longitude and store as Event's center location.
// CREATE Event.
// Respond with success message.

// Event Mapping page
// Retrieve (or persist) Event's center location
// Retrieve (or persist) invitee's Users locations
// Visit Google API to find locations within some radius
// determine if they're open
//  [ ] (currently, or at scheduled time of event)
// what type of establishment (park, bar, restaurant, etc.)
// PUT all location objects into the Event's array of potentials
// potentials within Event schema will have address, votes.
// Respond with the array of location objects

// Store the user's vote in the Event's {potentials: []}  of the Event

//Event Detail page [Map & VotePies]
// 
// Retrieve, from the Event, all invitees'/attendees' geolocations from database.
// Calculate average latitude/longitude
// Store the center lat/long in Event

// A route that 
// A route that hits the google maps API --> sends data
// A route that 



module.exports = router;