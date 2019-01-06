const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
const maintenance = false;

const { Client } = require('pg');

/* TODO : Cannot read property of undefined */
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});


let prefix = '.';

bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands/");

commandFiles.forEach(file => {
    const command = require(`./commands/${file}`); // eslint-disable-line
    bot.commands.set(command.name, command);
});

bot.on("ready", () => {
    bot.user.setActivity("Justin à poil", { type: "WATCHING" }).catch(err => console.error(err));
    console.log("Bot ready");
    // Database connection
    client.connect( (err, client) => {
        client.query('create table if not exists users_afk( \
                id text primary key, \
                nickname text, \
                reason text, \
                is_active integer default 0)', (err, result) => {
            //disconnent from database on error
            if (err !== null && err !== '') console.log(err);
        });
    });
});

bot.on("disconnected", () => {
    bot.login(process.env.TOKEN).catch(err => console.error(err));
});

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

    // TODO: Fonctionne correctement !
    // id de l'utilisateur mentionné : **user_mentioned.id**
    // résultat de la requête : **result.rows**
    // rows = [ { reason: 'PauseCaca' } ]
    const user_mentioned = message.mentions.users.first();
    if (typeof user_mentioned != "undefined") {
        message.channel.send(user_mentioned.id);
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: true,
        });
        client.connect( (err, client) => {
            client.query('select reason from users_afk \
                where is_active = 1', (err, result) => {
                //disconnent from database on error
                if (err !== null && err !== '') console.log(err);
                if (result.rows !== null) {
                    const rows = result.rows;
                    console.log(rows);
                    console.log(rows[1].reason);
                    console.log(rows.reason[1]);
                } else {
                    message.channel.send('L\'utilisateur n\'a pas précisé de raison d\'afk, pas cool !');
                }
            });
        });
        message.channel.send('Query terminée...');
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
