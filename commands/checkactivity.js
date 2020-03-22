const Discord = require('discord.js');
const bot = new Discord.Client();

module.exports = {
    name: 'ca',
    description: "Ouverture d'échecs random",
    execute(message, args) {
        bot.guilds.find('id', '504272478537908226').fetchMembers().then(members => {
            members.forEach(member => {
                console.log(member.user) // null
            })
        })
    }
};

