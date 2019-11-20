const {Client} = require('pg');
const fs = require("fs");

module.exports = {
    name: 'message',
    description: "Comment participes-tu sur le serveur ?",
    execute(message, args) {
        if (args[0] === 'start') {
            fs.readFile('./config/mots_dictionnaire.txt', function (err, data) {
                if (err) throw err;

                let content = data.toString();
                // let contentJsoned = JSON.parse(content);
                console.log(content);
            });
        }
    }
};
