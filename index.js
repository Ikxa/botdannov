const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client();
const {Client} = require('pg');
const axios = require('axios');
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

let prefix = '!';
let cpt = 0;
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/');

commandFiles.forEach((file) => {
    const command = require(`./commands/${file}`); // eslint-disable-line
    bot.commands.set(command.name, command);
});

client.on('guildMemberRemove',(member) => {
    client.channels.get('les-messages').send(`**${member.username}** vient de quitter le serveur..`);
    client.channels.get('504272478537908226').send(`**${member.username}** vient de quitter le serveur !`);
})

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

bot.on('presenceUpdate', (oldMember, newMember) => {
    let adrien = bot.fetchUser('193467165389619211');

    console.log(bot.user.get('EidorianP').id);

    if (adrien.presence.game.toString() === 'League of Legends') {
        message.channel.send('<@344551142916882442>, quitte ce jeu immédiatement. Cordialement, la direction.');
    }
});

bot.on('message', (message) => {
    if (message.author.bot) {
        return;
    }

    cpt++;
    if (cpt === 15) {
        // Changer la color des rôles
        let server = bot.guilds.get(message.guild.id).id;
        let guild = bot.guilds.get(server);
        guild.roles.forEach(role => {
            role.edit({
                color: "RANDOM"
            })
        })
        cpt = 0;
    }

    // Si attachment > 0 alors requête AJAX
    if (message.attachments.size > 0) {
        axios
            .post('http://www.jordanrenard.fr/add', {
                image: message.attachments.first()
            }).then(function (response) {
                console.log(response.data);
                console.log('Coucou la réponse');
            }).catch(function (error) {
                console.log('error ' + error);
            });
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
});

bot.login(process.env.TOKEN);

