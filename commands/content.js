const fs = require("fs");
let filename = './config/players_games.json';

module.exports = {
    name: "content",
    description: "Vous avez un jeu qui n'est plus à jour ?",
    execute(message, args) {
        if (args.length > 0) {
            fs.readFile(filename, function (err, data) {
                if (err) throw err;
                // TODO: Liste des jeux du mec passé en argument sous la forme JSON : contentJsoned[arg0]
                let content = data.toString();
                let arg0 = args[0].toUpperCase();
                let contentJsoned = JSON.parse(content);
                contentJsoned[arg0] = "Battlefield V";
                fs.writeFile(filename, JSON.stringify(content, null, 2), function (err) {
                    if (err) return console.log(err);
                    message.channel.send(contentJsoned[arg0]);
                })
            });
        }
    },
};