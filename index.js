const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');

let prefix = '!';
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/');

commandFiles.forEach((file) => {
    const command = require(`./commands/${file}`); // eslint-disable-line
    bot.commands.set(command.name, command);
});

bot.on('ready', message => {
    message.send('Je suis prêt.');
})

bot.on('message', (message) => {
    if (message.author.bot) {
        return;
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
            message.reply('Une erreur s\'est produite dans la commande.');
        }
    }
});

bot.login(process.env.TOKEN);