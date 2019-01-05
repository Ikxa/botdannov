const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
const maintenance = true;

const { Client } = require('pg');

/* TODO : Cannot read property of undefined */
// Trouver les bons identifiants pour la connexion à la base de données.
/*const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});*/


let prefix = '.';

bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands/");

commandFiles.forEach(file => {
    const command = require(`./commands/${file}`); // eslint-disable-line
    bot.commands.set(command.name, command);
});

bot.on("ready", () => {
    bot.user.setActivity("Justin à poil", { type: "WATCHING" }).catch(err => console.error(err));
    console.log("Bot ready"); // eslint-disable-line
    // Database connection
    /*client.connect( (err, client, done) => {
        client.query('create table if not exists users_afk( \
                id text primary key, \
                nickname text, \
                reason text, \
                is_active integer default 0)', (err, result) => {
            //disconnent from database on error
            done(err);
            console.log(err);
            console.log('result');
            console.log(result);
        });
    });*/
});

bot.on("disconnected", () => {
    bot.login(process.env.TOKEN).catch(err => console.error(err));
});

// Event listener for messages
bot.on("message", message => {
    if (maintenance === true) {
        // If maintenance is enabled, tell it and return
        let already_said = 0;
        if (already_said === 0) {
            message.channel.send('Désolé, je suis en maintenance pour le moment.');
            already_said = 1;
        }
        throw new Error("Mode maintenance activé sur le bot");
    }

    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).split(" ");
        const commandName = args.shift().toLowerCase();

        if (!bot.commands.has(commandName)) return;

        const command = bot.commands.get(commandName);
        try {
            command.execute(message, args, bot);
        } catch (error) {
            console.error(error);
            message.reply("Error code 3 : Execute command");
        }
    }
});

bot.login(process.env.TOKEN);
