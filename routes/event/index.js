// Routes for accessing Event data are defined here: paths from <hostroot>/event/<routeBelow>
// Controller methods are found in /controllers/eventController






const router = require("express").Router();
const fetchInvitees = require("./fetchInvitees")
const eventControl = require("../../controllers/eventController");
const userControl = require("../../controllers/userController");
const axios = require("axios");


router.post('/create', (req, res) => {

    // let invitees = req.body.invitees;
    // Add event Owner's coords to allCoordinates.
    let radius = req.body.radius ? parseFloat(req.body.radius) : 1000;
    let eventTitle = req.body.eventName ? req.body.eventName : "Unnamed Event";

    // Hardcoded Dummy data from DB:
    let invitees = [
        { userId: "5cbbeeda6e09e51f24a44704" },
        { userId: "5cbbeeda6e09e51f24a44705" },
        { userId: "5cbbeeda6e09e51f24a44706" },
    ];



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
        let avgCoords = { lat: sumCoords.lat / numInvitees, lng: sumCoords.lng / numInvitees }

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
        eventControl.createEvent(newEvent, (event)=>{
            invitees.forEach(inviT=>{
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
        axios.get(`http://localhost:3001/maps/nearby/${avgCoords.lat}/${avgCoords.lng}/${radius}`)
            .then(result => {
                const eventReturn = {
                    coordinates: avgCoords,
                    places: result.data
                }
                res.status(200).send(eventReturn);
            })
            .catch(err => {
                console.log(`Error within axios nearby request`)
                console.log(err);
            });


        // Send all the necessary data:
        // average coordinates (to map center)
        // places (to populate menu and generate a meetspot)


    });


})



module.exports = router;