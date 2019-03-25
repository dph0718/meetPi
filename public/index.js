let userId = "5c97f0df9b03b83cfcac6975";
let eventId = "5c97f0e09b03b83cfcac6978";


// POST functions +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// [ ] Put the data from grabUserData() on the page.
// [ ] Put the data from getEventDataSingle() on the page.

// Sends POST request to Create User
function createUserRequest(data) {
    $.post("/createUser", data, function (result) {
        console.log(`data inserted for:`);
        console.log(data.firstName);
    });
};

// Grabs User data from DB.
function grabUserData(data) {
    $.post('/userDashboard', data, function (result) {
        console.log(`User Data Grabbed.`);
        // Do something with User data
    });
};

function createEvent(data){
    $.post('/createEvent')
}

// Gets data for the Event from the db.
function getEventDataSingle(data) {
    $.post("/eventDetail", data, function (result) {
        // Do something with the returned Event data.
    });

};


// BUTTON handlers =============================================================================


// Grabs data from User's form and calls request function to create User entry.
$("#userForm").submit(function (event) {
    event.preventDefault();
    let user = {
        firstName: $("#firstName").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        defaultLocation: {
            address: $("#defaultAddress").val(),
        }
    };
    createUserRequest(user);
});


// Grabs User's Id, passes it into the db request, & returns other user data
$("#getUser").click(function (event) {
    event.preventDefault();
    let requestData = {
        user: {
            _id: userId
        }
    };
    grabUserData(requestData);
});

// Grabs Event's Id and passes it into the db request.
$("#getEvent").click(function (event) {
    let eventData = {
        _id: eventId,
    };
    getEventDataSingle(eventData);
});