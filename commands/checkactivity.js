const Discord = require('discord.js');
const bot = new Discord.Client();

module.exports = {
    name: 'ca',
    description: "Ouverture d'échecs random",
    execute(message, args) {
        let u, user;
        for(u in bot.users){
            user = bot.users[u];
            if(user instanceof Discord.User) console.log("["+u+"] "+user.username);
        }
    }
};

