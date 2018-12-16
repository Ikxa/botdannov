const Discord = require("discord.js");
// const cron = require("node-cron");
const fs = require("fs");

const config = require('config.json');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

// Init all command
const commandFiles = fs.readdirSync("./commands/");

commandFiles.forEach(file => {
    const command = require(`./commands/${file}`); // eslint-disable-line
    bot.commands.set(command.name, command);
});

bot.on("ready", () => {
    bot.user.setActivity(".help", { type: "LISTENING" }).catch(err => console.error(err));
    console.log("Bot ready"); // eslint-disable-line
});
bot.on("disconnected", () => {
    bot.login(process.env.TOKEN).catch(err => console.error(err));
});

// Event listener for messages
bot.on("message", message => {
    if (!message.content.startsWith(config.startCommand)) return;
    const args = message.content.slice(config.startCommand.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!bot.commands.has(commandName)) return;

    const command = bot.commands.get(commandName);
    try {
        command.execute(message, args, bot);
    } catch (error) {
        console.error(error);
        message.reply("Il y a erreur dans l'exécution de votre commande!");
    }
});

bot.login(process.env.TOKEN);