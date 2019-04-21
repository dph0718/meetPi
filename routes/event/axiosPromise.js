const axios = require("axios");

const makeAxios = (user) => {
    console.log(`Creating an AXIOS request`);

    return axios.get(`/user/${user.userId}`)

}

module.exports = makeAxios;