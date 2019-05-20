// Routes for accessing Event data are defined here: paths from <hostroot>/event/<routeBelow>
// Controller methods are found in /controllers/eventController

const router = require("express").Router();
const fetchInvitees = require("./fetchInvitees")
const eventControl = require("../../controllers/eventController");
const userControl = require("../../controllers/userController");
const mapsApi = require("../../api/maps")


// Creates the Event from req.body info
router.post('/create', (req, res) => {

    // let invitees = req.body.invitees;
    // Add event Owner's coords to allCoordinates.
    let radius = req.body.radius ? parseFloat(req.body.radius) : 1000;
    let eventTitle = req.body.eventName ? req.body.eventName : "Unnamed Event";

    // Hardcoded Dummy data from DB:
    let invitees_O = [
        { userId: "5cbbeeda6e09e51f24a44704" },
        { userId: "5cbbeeda6e09e51f24a44705" },
        { userId: "5cbbeeda6e09e51f24a44706" },
    ];
    req.body.invitees = invitees_O;
    let invitees = req.body.invitees;

    // Find invitees' data in User db
    fetchInvitees(invitees, (usersInvited) => {

        let numInvitees = usersInvited.length;

        // Store all users' coordinates in an array
        const allCoordinates = usersInvited.map(u => {
            return {
                lat: u.defaultLocation.latitude,
                lng: u.defaultLocation.longitude
            }
        });

        // Get the sum of all Invitees' coordinates
        let sumCoords = allCoordinates.reduce((total, val) => {
            return { lat: total.lat + val.lat, lng: total.lng + val.lng }
        });

        // Then average the sum of coordinates
        let avgCoords = { lat: sumCoords.lat / numInvitees, lng: sumCoords.lng / numInvitees };

        // Make final Event object to be created in DB.
        const newEvent = {
            body: {
                eventName: eventTitle,
                eventZip: null,
                eventCenter: {
                    latitude: avgCoords.lat,
                    longitude: avgCoords.lng
                },
                eventRadius: radius,
                attendees: usersInvited.map(u => u.id),
                // possibilities: Array,               
            }

        };

        // Insert Event in DB.
        eventControl.createEvent(newEvent, (event) => {
            // Then, for each invitee, add the event to their "events" field
            invitees.forEach(inviT => {
                let addEvent = {
                    body: {
                        userId: inviT.userId,
                        eventId: event._id
                    }
                }
                userControl.updateUserEvents(addEvent)
            })
        })

        // Make the nearbyPlaces request
        let lat = newEvent.body.eventCenter.latitude;
        let lng = newEvent.body.eventCenter.longitude;

        mapsApi.getNearbyPlaces(lat, lng, radius)
            .then(resolved => {
                console.log(`This is the resolution of the getNearbyPlaces within mapsApi`);
                console.log(resolved);
            })
            // Send all the necessary data:
            // average coordinates (to map center)
            // places (to populate menu and generate a meetspot)
            .then(res.send("Seems as though you've created an Event."))



    });


});


// Updates the Event in the req.body with the chosen address.
router.post("/update", (req, res) => {
    // The request contains the updated location of Event, chosen by creator
    // We'll need to grab the event's id
    /*      -On the front end, send the entire event object in the request
    */
    const event = req.body.event;
    console.log(`The request.body:`);
    console.log(req.body);

    // Add the Event location to the Event's db entry
    eventControl.updateEvent(event, (value) => {
        res.status(200).send("I reckon you've updated the event, pardner.")
    })



});

module.exports = router;