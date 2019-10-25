const {Client} = require('pg');

module.exports = {
    name: 'mute',
    description: "Mute quelqu'un pour 5 min, ça fait du bien!",
    execute(message, args) {
        if (!message.author.bot) {
            const client = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: true
            });
            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let dateTime = date+' '+time;
            client.connect((err, client) => {
                client.query(
                    'insert into mute_table (id, nickname, muted_at) values ($1, $2, $3)',
                    [message.author.id, args[0], dateTime],
                    (err) => {
                        if (err !== null && err !== '') console.log(err);
                    }
                );
                message.channel.send("Le mute est pris en compte pour 5 min !");
            });
        }
    }
};
