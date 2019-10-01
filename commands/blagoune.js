const axios = require("axios");

module.exports = {
    name: "blagoune",
    description: "Un max de barre !",
    execute(message, args) {

        const agent = new https.Agent({
            rejectUnauthorized: false
        });
        axios.get("http://api.yomomma.info/", { httpsAgent: agent }).then(function (response) {
            console.log(response);
        });

        message.channel.send("J'ai envoyé la blague!");

    },
};