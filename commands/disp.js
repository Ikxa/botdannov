const fs = require("fs");

module.exports = {
    name: "disp",
    description: "À quoi peut jouer mon ami?",
    execute(message, args) {
        if (args.length > 0) {
            if (args[0] == null) {
                message.channel.send("Indiquez un pseudo");
            } else {
                let arg0 = args[0].toUpperCase();
                fs.readFile('./config/players_games.json', function (err, data) {
                    if (err) throw err;

                    let content = data.toString();
                    let contentJsoned = JSON.parse(content);
                    if (contentJsoned !== null) {
                        message.channel.send('Les jeux que ' + arg0 + ' a de disponible sont : ' + contentJsoned[arg0]);
                    } else {
                        message.channel.send("Erreur dans l'exécution de la commande");
                    }
                });
            }
        }
    },
};