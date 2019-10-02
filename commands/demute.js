const {Client} = require('pg');

module.exports = {
    name: 'demute',
    description: "Demute tout le monde!",
    execute(message, args) {
        if (!message.author.bot) {
            const client = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: true
            });

            client.connect((err, client) => {
                client.query(
                    'delete from mute_table',
                    (err) => {
                        if (err !== null && err !== '') console.log(err);
                    }
                );
                message.channel.send("Tout le monde est demute");
            });
        }
    }
};
