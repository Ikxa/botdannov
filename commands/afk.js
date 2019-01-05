const {Client} = require('pg');

/* TODO : Cannot read property of undefined */
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});

module.exports = {
    name: "afk",
    description: "Tu dois partir ? Préviens nous !",
    execute(message, args) {
        if (args.length > 0) {
            client.connect((err, client) => {
                client.query('insert into users_afk (id, nickname, reason, is_active) values ($1, $2, $3, $4)',
                    [message.author.id, message.author.username, args[0], 1], (err, result) => {
                        console.log('err');
                        console.log(err);
                        console.log('result');
                        console.log(result.rowCount);
                    });
            });
        }
    },
};