const Discord = require('discord.js');

module.exports = {
    name: "poll",
    description: "Lancez un sondage !",
    execute(message, args) {
        // const emoji = message.guild.emojis.find(emoji => emoji.name === 'ayy');
        // message.react(emoji);
        const embed = new Discord.MessageEmbed()
            .setColor(0xffffff)
            .setFooter('Votez !')
            .setDescription(args.join(' '))
            .setTitle('Vote créé par ${message.author.username.toString()}');

        let msg = message.channel.send(embed);
        msg.react('smile');
        msg.react('joy');

        message.delete({timeout: 1000});
    },
};