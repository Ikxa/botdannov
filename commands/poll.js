const Discord = require('discord.js');

module.exports = {
    name: "poll",
    description: "Lancez un sondage !",
    execute(message, args) {
        let choices = [];
        let fullPoll = args.join(' ');
        let question = fullPoll.split("/")[0];
        let split = fullPoll.split("/");
        let reactions = {1: "one", 2: "two", 3: "three", 4: "four"};
        for (let i = 1; i <= (split.length - 1); i++) {
            choices.push(split[i].replace( /\s/g, ''));
        }

        message.channel.send(question + '\n ' +
        choices.forEach(function (c) {
            message.channel.send(c.toString());
        }));

        for (let i = 0; i <= (choices.length - 1); i++) {
            for (let key in reactions) {
                if (key == i) {
                    console.log("key " + i + " has value " + reactions[i]);
                    const emoji = message.emojis.get('305818615712579584');
                    message.react(emoji);
                }
            }
        }
    },
};