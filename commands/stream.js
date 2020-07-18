const Discord = require('discord.js');
const bot = new Discord.Client();

module.exports = {
    name: 'stream',
    description: "Who's the best streamer EUW ?",
    execute(message, args, bot) {

        message.channel.send({
            embed: {
                color: 3447003,
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL
                },
                title: "Tu cherches le meilleur streameur EUW ? Clique ici !",
                url: "http://twitch.tv/eidoriaan",
                description: "Tu vas vraiment passer un bon moment.",
                fields: [{
                    name: "Attention",
                    value: "[Clique pas ici surtout !](http://pornhub.com)"
                }
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: "Jojoséphine"
                }
            }
        });

        /*const role = <guild>.roles.cache.find(role => role.name === '<role name>');
        const member = <message>.mentions.members.first();
        member.roles.add(role);*/

    }
};

