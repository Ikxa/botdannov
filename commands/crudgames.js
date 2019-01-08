const {Client} = require('pg');

module.exports = {
    name: "crudgames",
    description: "Un max de barre !",
    execute(message, args) {
        if (args.length > 0) {
            const client = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: true,
            });

            client.connect((err, client) => {
                client.query('insert into players_games (id, nickname, list_of_games) values ($1, $2, $3)',
                    ["231451354470678528", "jordan", "'League of Legends', 'Rocket League', 'Brawlhalla', 'H1Z1', 'PUBG', 'CS:Go', 'Dofus', 'Battlefield V', 'Fifa 18', 'Witch it', 'Business Tour', 'Minecraft', 'DayZ'"], (err) => {
                        if (err !== null && err !== '') console.log(err);
                        message.channel.send('Les jeux de jordan ont bien été ajoutés');
                });
                client.query('insert into players_games (id, nickname, list_of_games) values ($1, $2, $3)',
                    ["231451354470678528", "lowki", "'League of Legends', 'Rocket League', 'CS:Go', 'Dofus', 'Battlefield V', 'Fifa 18', 'DayZ', 'PUBG', 'Battlefield 1'"], (err) => {
                        if (err !== null && err !== '') console.log(err);
                        message.channel.send('Les jeux de lowki ont bien été ajoutés');
                    });
                client.query('insert into players_games (id, nickname, list_of_games) values ($1, $2, $3)',
                    ["231451354470678528", "adrien", "'Rocket League', 'League of Legends', 'Fifa 18', 'Fifa 19', 'PUBG', 'Minecraft', 'CS:Go', 'Brawlallah'"], (err) => {
                        if (err !== null && err !== '') console.log(err);
                        message.channel.send('Les jeux de adrien ont bien été ajoutés');
                    });
            });

        }
    },
};