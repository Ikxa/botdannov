const { Client } = require('pg');

module.exports = {
    name        : 'message',
    description : "Comment participes-tu sur le serveur ?",
    execute(message, args) {
        if (!message.author.bot) {
            const client = new Client({
                connectionString : process.env.DATABASE_URL,
                ssl              : true
            });

            client.query(
                'select id, nickname, nb from counter_msg \
                where nickname = $1',
                [message.author.username.toString()],
                (err, result) => {
                    if (err !== null && err !== '') console.log(err);
                    const rows = result.rows;
                    message.channel.send('Vous avez envoyé ' + rows[0]['nb'] + ' message(s) sur le serveur.');
                }
            );

        }
    }
};
