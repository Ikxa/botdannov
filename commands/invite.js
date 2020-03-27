const Discord = require('discord.js');
const bot = new Discord.Client();
const {Client} = require('pg');
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

module.exports = {
    name: 'invite',
    description: "Invitez les autres joueurs",
    execute(message, args) {
        let currentUser = message.author;
        console.log('J\'essaye de récupérer l\'ID de l\'auteur du message');

        client.connect((err, client) => {
            client.query(
                'select * from played',
                (err, result) => {
                    if (err !== null && err !== '') console.log(err);
                    console.log(result);
                }
            );
        });
    }
};

