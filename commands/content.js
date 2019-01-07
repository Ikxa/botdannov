const fs = require("fs");
const filename = './config/players_games.json';
const file = require(filename);

module.exports = {
    name: "content",
    description: "Vous avez un jeu qui n'est plus à jour ?",
    execute(message) {
        message.channel.send(file);

        /*
        file.key = "new value";
        fs.writeFile(filename, JSON.stringify(file, null, 2), function (err) {
            if (err) return console.log(err);
            console.log(JSON.stringify(file));
            console.log('writing to ' + filename);
        });
         */
    },
};