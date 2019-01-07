const {Client} = require('pg');

module.exports = {
    name: "stopafk",
    description: "Tu es revenu ? Dis-le nous!",
    execute(message) {
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: true,
        });

        client.connect((err, client) => {
            client.query('delete from users_afk where nickname = $1 and is_active = 1', [message.author.username], (err, result) => {
                message.channel.send('La raison de votre afk a été annulée.');
            });
        });
    },
};