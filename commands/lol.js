const fs = require("fs");

module.exports = {
    name: "lol",
    description: "Infos aléatoires pour League of Legends",
    execute(message, args) {
        if (args.length > 0) {
            if (args[0] === "mode") {
                let modes = ["5 vs 5", "3 vs 3", "ARAM", "mode temporaire"];
                let rand = Math.floor(Math.random() * modes.length);

                message.channel.send("Partez jouer en " + modes[rand])
            } else if (args[0] === "champs") {
                fs.readFile('./config/leagueoflegends_champions.json', function (err, data) {
                    if (err) throw err;
                    let content = data.toString();
                    let contentJsoned = JSON.parse(content);
                    let rand = Math.floor(Math.random() * contentJsoned[args[0]].length);
                    message.channel.send("Champion aléatoire : " + contentJsoned[args[0]][rand]);
                });
            }
        }
    },
};