const fs = require("fs");

module.exports = {
    name: "rg2",
    description: "Vous ne savez pas à quoi jouer ? Demandez !",
    execute(message, args) {
        /*function compare(arr1, arr2) {
            const finalArray = [];
            arr1.forEach((e1) => arr2.forEach((e2) => {
                if (e1 === e2) {
                    finalArray.push(e1);
                }
            }));

            return finalArray;
        }*/

        if (args.length > 0) {
            let arg0 = args[0].toUpperCase();
            let arg1 = args[1].toUpperCase();
            fs.readFile('./config/players_games.json', function (err, data) {
                if (err) throw err;
                //message.channel.send(data.toString());
                let content = data.toString();
                let contentJsoned = JSON.parse(content);
                message.channel.send(typeof contentJsoned);
            })
        } else {
            let games = ["League of Legends", "Rocket League", "H1Z1", "PUBG", "CS:Go", "Dofus", "Battlefield V", "Fifa 18", "DayZ", "Brawlhalla", "Minecraft", "Witch it", "Business Tour"];
            let randomNumber = Math.floor(Math.random() * games.length);

            message.channel.send('Vous devez jouer à : ' + games[randomNumber]);
        }
    },
};