const fs = require("fs");

module.exports = {
    name: "rg2",
    description: "Vous ne savez pas à quoi jouer ? Demandez !",
    execute(message, args) {
        function compare(arr1, arr2) {
            const finalArray = [];
            arr1.forEach((e1) => arr2.forEach((e2) => {
                if (e1 === e2) {
                    finalArray.push(e1);
                }
            }));

            return finalArray;
        }

        if (args.length > 0) {
            if (args[0] == null || args[1] == null) {
                message.channel.send("Je ne connais pas l'un des deux personnes");
            } else {
                let arg0 = args[0].toUpperCase();
                let arg1 = args[1].toUpperCase();
                let finalArray = null;
                fs.readFile('./config/players_games.json', function (err, data) {
                    if (err) throw err;
                    //message.channel.send(data.toString());
                    let content = data.toString();
                    let contentJsoned = JSON.parse(content);
                    finalArray = compare(contentJsoned[arg0], contentJsoned[arg1]);
                    let randomNumber = Math.floor(Math.random() * finalArray.length);
                    if (typeof finalArray[randomNumber] !== 'undefined') {
                        message.channel.send('Vous devez jouer à : ' + finalArray[randomNumber]);
                    } else {
                        message.channel.send("Il n'y a pas de jeu en commun entre ces deux keum...");
                    }
                });
            }
        } else {
            let games = ["League of Legends", "Rocket League", "H1Z1", "PUBG", "CS:Go", "Dofus", "Battlefield V", "Fifa 18", "DayZ", "Brawlhalla", "Minecraft", "Witch it", "Business Tour"];
            let randomNumber = Math.floor(Math.random() * games.length);

            message.channel.send('Vous devez jouer à : ' + games[randomNumber]);
        }
    },
};