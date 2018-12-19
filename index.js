const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();

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
});

bot.on("disconnected", () => {
    bot.login(process.env.TOKEN).catch(err => console.error(err));
});

// Event listener for messages
bot.on("message", message => {
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
    } else {
        if ((message.author.id == '231451354470678528') || (message.author.id == '193467165389619211')) {
            if (message.attachments.size > 0) {
                message.delete();
                message.channel.send('Interdiction de poster des photos Lowki ! Enfoiré !');
            } else {
                message.channel.send('Il n\'y a pas de photos');
            }
        } else {
            message.channel.send('Utilisateur introuvable');
        }

    }
});

bot.login(process.env.TOKEN);
