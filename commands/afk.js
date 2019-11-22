const {Client} = require('pg');

module.exports = {
    name: 'afk',
    description: "Tu comptes t'absenter, dis-le nous!",
    execute(message, args) {
        if (args.length > 0) {
            let reason = args.join(' ');
            const client = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: true
            });

            if (reason != 'stop') {
                client.connect((err, client) => {
                    client.query(
                        'select reason from users_afk \
                where is_active = 1 and id = $1',
                        [message.author.id],
                        (err, result) => {
                            if (err !== null && err !== '') console.log(err);
                            const rows = result.rows;
                            if (typeof rows[0] !== 'undefined') {
                                message.channel.send(
                                    "Vous avez déjà une raison d'afk de préciser, merci de faire un .stopafk avant !"
                                );
                            } else {
                                client.query(
                                    'insert into users_afk (id, nickname, reason, is_active) values ($1, $2, $3, 1)',
                                    [message.author.id, message.author.username, reason],
                                    (err) => {
                                        if (err !== null && err !== '') console.log(err);
                                        message.channel.send('La raison de votre afk a bien été prise en compte');
                                    }
                                );
                            }
                        }
                    );
                });
            }

            if (reason == 'stop') {
                client.connect((err, client) => {
                    client.query(
                        'delete from users_afk where nickname = $1 and is_active = 1',
                        [message.author.username],
                        (err, result) => {
                            message.channel.send('La raison de votre afk a été annulée.');
                        }
                    );
                });
            }

            message.delete().catch((O_o) => {
            });
        }
    }
};
