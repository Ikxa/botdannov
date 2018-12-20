const fs = require("fs");

module.exports = {
    name: "rg",
    description: "Vous ne savez pas à quoi jouer ? Demandez !",
    execute(message, args) {
        // const limit = parseInt(args.join(" "));
        /*let games = ['League of Legends', 'Rocket League', 'Brawlhalla', 'H1Z1', 'PUBG', 'CS:Go', 'Dofus', 'Battlefield V', 'Fifa 18', 'Witch it', 'Business Tour', 'Minecraft', 'Gang Beast'];
        const number = Math.floor((Math.random() * games.length) + 1);
        message.channel.send('Vous devez jouer à : **' + games[number] + '**');*/



        let data = fs.readFileSync('./files/games.json','utf8');

        message.channel.send(typeof data);
    },
};