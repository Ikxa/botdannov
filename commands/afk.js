const { Client } = require('pg');

module.exports = {
    name: "afk",
    description: "Tu comptes t'absenter, dis-le nous!",
    execute(message, args) {
        if (args.length > 0) {
            /* TODO : Cannot read property of undefined */
            const client = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: true,
            });

            client.connect( (err, client) => {
                client.query('insert into users_afk (id, nickname, reason, is_active) values ($1, $2, $3, 1)',
                    [message.author.id, message.author.username, args[0]], (err, result) => {
                        message.channel.send(err.toString());
                        message.channel.send('Résultat de la query');
                        message.channel.send(result.toString());
                    });
            });
        }
    },
};