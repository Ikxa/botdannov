const fs = require("fs");

module.exports = {
    name: "content",
    description: "Vous avez un jeu qui n'est plus à jour ?",
    execute(message, args) {
        if (args.length > 0) {
            fs.readFile('./config/players_games.json', function (err, data) {
                if (err) throw err;
                //message.channel.send(data.toString());
                let content = data.toString();
                let contentJsoned = JSON.parse(content);
                message.channel.send(contentJsoned);
                let contentToChange = contentJsoned[args[0]];
                message.channel.send(contentToChange);
            });
        }
    },
};