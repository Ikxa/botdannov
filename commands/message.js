const {Client} = require('pg');

module.exports = {
    name: 'message',
    description: "Comment participes-tu sur le serveur ?",
    execute(message, args) {
        if (!message.author.bot) {
            const client = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: true
            });
            if (args[0] == "rank")
            {
                client.connect((err, client) => {
                    client.query(
                        'select id, nickname, nb from counter_msg ORDER BY nb ASC LIMIT 3',
                        (err, result) => {
                            if (err !== null && err !== '') console.log(err);
                            const rows = result.rows;
                            console.log(rows);
                        }
                    );
                });
            } else {
                client.connect((err, client) => {
                    client.query(
                        'select id, nickname, nb from counter_msg \
                        where nickname = $1',
                        [message.author.username.toString()],
                        (err, result) => {
                            if (err !== null && err !== '') console.log(err);
                            const rows = result.rows;
                            if (rows[0]['nb'] > 0) {
                                if (rows[0]['nb'] > 1)
                                    message.channel.send('Vous avez envoyé ' + rows[0]['nb'] + ' messages sur le serveur.');
                                else
                                    message.channel.send('Vous avez envoyé ' + rows[0]['nb'] + ' message sur le serveur.');
                            } else {
                                message.channel.send("Vous n'avez pas encore envoyé de message sur le serveur !");
                            }
                        }
                    );
                });
            }
        }
    }
};
