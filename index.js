const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client();
const {Client} = require('pg');
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

let prefix = '!';
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/');

commandFiles.forEach((file) => {
    const command = require(`./commands/${file}`); // eslint-disable-line
    bot.commands.set(command.name, command);
});


bot.on('ready', (message) => {
    console.log('Bot ready');
    // Database connection
    client.connect((err) => {
        client.query(
            'DROP TABLE if exists played ',
            (err, result) => {
                if (err !== null && err !== '') console.log(err);
            }
        );

        client.query(
            'create table if not exists played ( \
                id_user bigint, \
                id_game bigint, \
                game_nom text, \
                played_at date)',
            (err, result) => {
                if (err !== null && err !== '') console.log(err);
                else console.log('Table crée');
            }
        );
    });
});

bot.on('presenceUpdate', (user) => {
    if (typeof user.presence.game !== 'undefined' && user.presence.game !== null) {
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: true
        });

        client.connect((err) => {
            client.query(
                'insert into played (id_user, id_game, game_nom, played_at) values ($1, $2, $3, $4)',
                [user.user.id, user.presence.game.applicationID, user.presence.game.name, new Date()],
                (err) => {
                    if (err !== null && err !== '') console.log(err);
                }
            );
        });
    }
});

bot.on('message', (message) => {
    if (message.author.bot) {
        return;
    }

    /**/

// Commande à exécuter
    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).split(' ');
        const commandName = args.shift().toLowerCase();
        if (!bot.commands.has(commandName)) return;
        const command = bot.commands.get(commandName);

        try {
            command.execute(message, args, bot);
        } catch (error) {
            console.error(error);
            message.reply('Error code 3 : Execute command');
        }
    }
})
;

bot.login(process.env.TOKEN);

