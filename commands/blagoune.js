const axios = require("axios");

module.exports = {
    name: "blagoune",
    description: "Un max de barre !",
    execute(message) {
        axios.get("http://api.yomomma.info/").then(response => {
            console.log(response);
            message.channel.send(response.joke);
        });
    },
};