const {Client} = require('pg');
const fs = require("fs");

module.exports = {
    name: 'message',
    description: "Comment participes-tu sur le serveur ?",
    execute(message, args) {
        console.log('Salut 1');
        if (args[0] === 'start') {
            console.log('Salut 2');
            fs.readFile('./config/mots_dictionnaire.txt', function (err, data) {
                if (err) throw err;
                console.log('Salut 3');
                let content = data.toString();
                // let contentJsoned = JSON.parse(content);
                console.log(content);
            });
        }
    }
};
