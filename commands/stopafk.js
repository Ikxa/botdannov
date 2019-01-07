const { Client } = require('pg');

module.exports = {
    name: "stopafk",
    description: "Tu es revenu ? Dis-le nous!",
    execute(message, args) {
        if (args.length > 0) {
            const client = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: true,
            });

            client.connect( (err, client) => {
                client.query('delete from users_afk where username = ' + args[0] + ' and is_active = 1', (err, result) => {
                        message.channel.send(err.toString());
                        message.channel.send('Résultat de la query');
                        message.channel.send(result.toString());
                    });
            });
        }
    },
};