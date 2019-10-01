const axios = require("axios");

module.exports = {
    name: "blagoune",
    description: "Un max de barre !",
    execute(message, args) {
        console.log("J'essaye de faire la requête axios");
        axios.get("http://api.yomomma.info/").then(response => {
            console.log(response);
            message.channel.send(response.joke);
        });
        console.log("Je suis censé l'avoir réussi !");
    },
};