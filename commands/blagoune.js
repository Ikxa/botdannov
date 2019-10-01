const axios = require("axios");

module.exports = {
    name: "blagoune",
    description: "Un max de barre !",
    execute(message, args) {
        axios.get('http://api.yomomma.info/')
            .then(function (response) {
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function (response) {
                // always executed
                console.log(response);
            });

        message.channel.send("J'ai envoyé la blague!");
    },
};