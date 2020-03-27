const Discord = require('discord.js');
const bot = new Discord.Client();

module.exports = {
    name: 'invite',
    description: "Invitez les autres joueurs",
    execute(message, args) {
        let currentUserId = message.author.id;
        let currentUser = bot.fetchUser(currentUserId);
        console.log(currentUser);
    }
};

