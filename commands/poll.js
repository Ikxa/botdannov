const Discord = require('discord.js');
const bot = new Discord.Client();

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
            choices.push(split[i].replace(/\s/g, ''));
        }

        const embed = new Discord.RichEmbed()
            .setTitle("Sondage :")
            .setAuthor(message.author.username.toString(), message.author.avatarURL)
            .setColor(0x00AE86)
            .setDescription(question);

        let cpt = 0;
        choices.forEach(function (c) {
            cpt = cpt + 1;
            embed.addField('Choix ' + cpt + ' :', c.toString())
        });

        message.channel.send({embed}).then(embedMessage => {
            embedMessage.react("👍");
        });
    },
};