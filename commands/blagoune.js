const axios = require("axios");

module.exports = {
    name: "blagoune",
    description: "Un max de barre !",
    execute(message) {
        axios.get("http://api.yomomma.info/").then(response => {
            message.channel.send(response.data.joke);
        });
    },
};