// Routes for accessing Event data are defined here: paths from <hostroot>/event/<routeBelow>
// Controller methods are found in /controllers/eventController






const router = require("express").Router();
const fetchInvitees = require("./fetchInvitees")



// Route for creating an event:
// [ ] Adds Invitees(by id) to the Event's user list.
// [ ] Grabs Invitees' long and lat coords
// [ ] and Uses them to calculate average lat/lng coords
// [ ] stores Average lat/lng in Event database
// [ ] 
// [ ] 

router.post('/create', (req, res) => {

    // let invitees = req.body.invitees;

    let invitees = [{ userId: "5cb76b0a527d9b2eece80338" },
    { userId: "5cb76b0a527d9b2eece80337" }
    ]

// Find invitees' data in User db

    fetchInvitees(invitees, (usersInvited) => {

         

        res.send();
    });


})



module.exports = router;