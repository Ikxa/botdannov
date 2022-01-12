const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
var Snaps = require('snaps').Snaps;

let prefix = '!';
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/');

commandFiles.forEach((file) => {
    const command = require(`./commands/${file}`); // eslint-disable-line
    bot.commands.set(command.name, command);
});

bot.on('ready', message => {
    console.log('Je suis prêt.');
})

bot.on('message', (message) => {
    if (message.author.bot) {
        return;
    }


    (new Snaps('belzeputh', 'l5dv2q6a58')).then(function(snaps) {
        console.log(snaps.getFriends());
        /* ->
          {
            "name": "mileyxxcyrus",
            "displayName": "Miley",
            "canSeeCustomStories": true,
            "isPrivate": false
          },
          {
            "name": "canadiangoose",
            "displayName": "Justin",
            "canSeeCustomStories": true,
            "isPrivate": true
          }
         */
        // var file = fs.createReadStream('/path/to/an/image.jpg');
        // return snaps.send(file, ['mileyxxcyrus', 'canadiangoose'], 5);
    }).catch(function(err) {
        // handle error
    })

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