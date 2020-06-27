const Discord = require('discord.js');

module.exports = {
    name: 'stream',
    description: "Who's the best streamer EUW ?",
    execute(message, args, bot) {

        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#09F')
            .setTitle('Best streamer EUW')
            .setURL('https://www.twitch.tv/eidoriaan')
            .setAuthor('Jojoséphine', 'https://i.imgur.com/wSTFkRM.png', 'https://www.pornhub.com')

        message.channel.send(exampleEmbed);

        /*const role = <guild>.roles.cache.find(role => role.name === '<role name>');
        const member = <message>.mentions.members.first();
        member.roles.add(role);*/

    }
};

