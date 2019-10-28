const {Client} = require('pg');
const moment = require('moment');

module.exports = {
    name: 'mute',
    description: "Mute quelqu'un pour 5 min, ça fait du bien!",
    execute(message, args) {
        if (!message.author.bot) {
            const client = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: true
            });
            let today = moment().format('YYYY-MM-DD HH:mm:ss');
            let todayParsed = moment(today);
            console.log('todayParsed');
            console.log('typeof todayParsed' + typeof todayParsed['_i']);
            console.log(todayParsed['_i']);
            client.connect((err, client) => {
                client.query(
                    'insert into mute_table (id, nickname, muted_at) values ($1, $2, $3)',
                    [message.author.id, args[0], todayParsed['_i']],
                    (err) => {
                        if (err !== null && err !== '') console.log(err);
                    }
                );
                message.channel.send("Le mute est pris en compte pour 5 min !");
            });
        }
    }
};
