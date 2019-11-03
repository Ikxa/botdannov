const Discord = require('discord.js');

module.exports = {
    name: "poll",
    description: "Lancez un sondage !",
    execute(message, args) {
        // const emoji = message.guild.emojis.find(emoji => emoji.name === 'ayy');
        // message.react(emoji);
        let fullPoll = args.join(' ');
        let question = fullPoll.split("/")[0];
        console.log(question);
    },
};