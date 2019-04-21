const userController = require("../../controllers/userController");
const eventController = require("../../controllers/eventController")
const axios = require("axios");

const makeAxios = require("./axiosPromise")


const fetchInvitees = (invitees, cb) => {

    const port = process.env.PORT || "localhost:3001";

    axios.all(invitees.map(i => axios.get(`http://${port}/user/${i.userId}`)))
        .then(axios.spread(function (...res) {

            let inviteesArray = [];
            res.forEach(element => {
                console.log(element.data);
                inviteesArray.push(element.data)

            });
            cb(inviteesArray)
        }))
        .catch(error => {
            console.log(`ERROR within axios.all() request:`);
            console.log(error);
        });
};

module.exports = fetchInvitees;