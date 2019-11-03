const Discord = require('discord.js');

module.exports = {
    name: "poll",
    description: "Lancez un sondage !",
    execute(message, args) {
        // const emoji = message.guild.emojis.find(emoji => emoji.name === 'ayy');
        // message.react(emoji);
        let choices = [];
        let fullPoll = args.join(' ');
        let question = fullPoll.split("/")[0];
        let split = fullPoll.split("/");
        for (let i = 1; i <= (split.length - 1); i++) {
            choices.push(split[i]);
        }
        console.log("question :");
        console.log(question);
        console.log("choix :");
        console.log(choices);
    },
};