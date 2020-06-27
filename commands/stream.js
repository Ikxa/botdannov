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
                title: "This is an embed",
                url: "http://google.com",
                description: "This is a test embed to showcase what they look like and what they can do.",
                fields: [{
                    name: "Fields",
                    value: "They can have different fields with small headlines."
                },
                    {
                        name: "Masked links",
                        value: "You can put [masked links](http://google.com) inside of rich embeds."
                    },
                    {
                        name: "Markdown",
                        value: "You can put all the *usual* **__Markdown__** inside of them."
                    }
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: "© Example"
                }
            }
        });

        /*const role = <guild>.roles.cache.find(role => role.name === '<role name>');
        const member = <message>.mentions.members.first();
        member.roles.add(role);*/

    }
};

