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
        let reactions = {1: "1⃣", 2: "2⃣", 3: "3⃣", 4: "4⃣"};
        for (let i = 1; i <= (split.length - 1); i++) {
            choices.push(split[i].replace(/^\s+|\s+$/g, ''));
        }

        if (choices.length > 4) {
            message.channel.send('Vous ne pouvez pas mettre plus de 4 choix.');
            return;
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

        message.channel.send({embed}).then(async embedMessage => {
            for (let i = 1; i <= choices.length; i++) {
                for (let n in reactions) {
                    if (i == n) {
                        await embedMessage.react(reactions[n]);
                    }
                }
            }
        });
    },
};