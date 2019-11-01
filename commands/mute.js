const {Client} = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

module.exports = {
    name: 'mute',
    description: "Mute quelqu'un pour 5 min, ça fait du bien!",
    execute(message, args) {
        if (!message.author.bot) {
            let params = {nickname: args[0], timer: args[1]};
            client.connect((err, client) => {
                client.query(
                    'select id, nickname, params from mute \
                    where nickname = $1',
                    [args[0]],
                    (err, result) => {
                        if (err !== null && err !== '') console.log(err);
                        const rows = result.rows;
                        if (typeof rows[0] !== 'undefined') {
                            message.channel.send(args[0] + ' est déjà mute.');
                        } else {
                            client.query(
                                'insert into mute (id, nickname, params) values ($1, $2, $3)',
                                [message.author.id, args[0], JSON.stringify(params)],
                                (err, result) => {
                                    if (err !== null && err !== '') console.log(err);
                                    message.channel.send('Le mute est bien pris en compte.');
                                }
                            );
                        }
                    }
                );
            });
        }
    }
};
