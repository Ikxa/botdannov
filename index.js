const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
const client = require("../config/database.js");
const maintenance = true;

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
    client.connect( (err, client, done) => {
        client.query('create table if not exists users_afk( \
                id text primary key, \
                nickname text, \
                name text, \
                count integer default 0)', (err, result) => {
            //disconnent from database on error
            done(err);
        });
    });
});

bot.on("disconnected", () => {
    bot.login(process.env.TOKEN).catch(err => console.error(err));
});

// Event listener for messages
bot.on("message", message => {
    if (maintenance === true) {
        // If maintenance is enabled, tell it and return
        message.channel.send('Désolé, je suis en maintenance pour le moment.');
        return;
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
