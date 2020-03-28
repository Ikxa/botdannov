const Discord = require('discord.js');
const bot = new Discord.Client();
const {Client} = require('pg');
const client = new Client({
    connectionString: 'postgres://efbrwpzfgdilef:88c1889e6fe792001f46717b05b8420bdc5e270f7e944262d11292451b7bb805@ec2-54-247-125-38.eu-west-1.compute.amazonaws.com:5432/da0cm0pgfn2t41',
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

