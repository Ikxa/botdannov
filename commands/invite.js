const Discord = require('discord.js');
const bot = new Discord.Client();
const {Client} = require('pg');

module.exports = {
    name: 'invite',
    description: "Invitez les autres joueurs",
    execute(message, args) {
        let user = message.author;
        let found = [];
        let currentDate = new Date();

        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: true
        });

        client.connect((err) => {
            client.query(
                'select * from played \
                        where id_user != $1',
                [message.author.id],
                (err, result) => {
                    if (err !== null && err !== '') console.log(err);
                    const rows = result.rows;
                    if (typeof rows != 'undefined' && rows.length > 0) {
                        rows.forEach(function (row) {
                            if (user.presence.game.applicationID == row.id_game)
                            {
                                if (found.includes(row.id_user) === false && (currentDate - row.played_at <= 2)) {
                                    found.push(row.id_user);
                                    message.channel.send('<@' + row.id_user + '> a joué récemment à ' + row.game_nom + ', invite le ?!');
                                }
                            }
                        });
                    } else {
                        message.channel.send('Personne ne peut jouer avec toi.');
                    }
                }
            );
        });
    }
};

