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
    client.connect((err, client) => {
        // Create table for users_afk
        client.query(
            'create table if not exists played( \
                id text primary key, \
                id_user text, \
                id_game text, \
                name_game text, \
                played_at date)',
            (err, result) => {
                if (err !== null && err !== '') console.log(err);
            }
        );
    });
});

bot.on('presenceUpdate', (user) => {
    console.log('Présence update');
    // console.log(user.user);
    // console.log(user.presence.game.applicationID);

    if (user.presence.game.applicationID != null) {
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: true
        });

        client.connect((err, client) => {
            client.query(
                'insert into played (id_user, id_game, name_game, played_at) values ($1, $2, $3, $4)',
                [user.id, user.presence.game.applicationID, user.presence.game.name, new Date()],
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

    let regx = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    let cdu = regx.test(message.content.toLowerCase());

    if (cdu === true && message.channel.id != '680739479862247429') {
        bot.channels.get('680739479862247429').send("<@" + message.author.id + ">, je déplace le lien ici.");
        bot.channels.get('680739479862247429').send(message.content);
        message.delete();
    }


    if (message.attachments.size > 0 && message.channel.id != '525134186504519680') {
        message.attachments.forEach(attachment => {
            const url = attachment.url;
            bot.channels.get('525134186504519680').send('', {file: url});
            bot.channels.get('525134186504519680').send("<@" + message.author.id + ">, je déplace la photo ici.");
        });
        message.delete();
    }

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

