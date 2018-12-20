module.exports = {
    name: "rg",
    description: "Get a random game",
    execute(message, args) {
        // const limit = parseInt(args.join(" "));
        let games = ['League of Legends', 'Rocket League', 'Brawlhalla', 'H1Z1', 'PUBG', 'CS:Go', 'Dofus', 'Battlefield V', 'Fifa 18', 'Witch it', 'Business Tour'];
        const number = Math.floor((Math.random()    * games.length) + 1);
        message.channel.send('Vous devez à jouer à : ' + games[number]);
    },
};