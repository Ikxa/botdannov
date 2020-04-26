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
    const channel = oldMember.guild.channels.find(x => x.name === "les-messages");
    if (!channel) return;
    let oldStreamingStatus = oldMember.presence.game ? oldMember.presence.game.streaming : false;
    let newStreamingStatus = newMember.presence.game ? newMember.presence.game.streaming : false;

    if(oldStreamingStatus == newStreamingStatus){
        return;
    }

    if(newStreamingStatus){
        if (newMember.presence.game && newMember.presence.game.name === 'game name' || newMember.presence.game.details.match(/keywords in stream/gi)) {
            channel.send(`${newMember.user}, is live URL: ${newMember.presence.game.url}`);
            return;
        }
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
        console.log(message.attachments);
        console.log('Une image a été envoyée à jordanrenard.fr');
        axios
            .post('http://www.jordanrenard.fr/add', {
                image: message.attachments.url
            }).then(function (response) {
                message.channel.send(response.data);
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

