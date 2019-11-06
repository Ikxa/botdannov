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
            /*
             * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
             */
            .setColor(0x00AE86)
            .setDescription(question)
            // .setFooter("This is the footer text, it can hold 2048 characters", "http://i.imgur.com/w1vhFSR.png")
            // .setImage("http://i.imgur.com/yVpymuV.png")
            // .setThumbnail("http://i.imgur.com/p2qNFag.png")
            // .setTimestamp()
            // .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")

            // .addField("Inline Field", "They can also be inline.", true)
            .addBlankField(true);
            // .addField("Inline Field 3", "You can have a maximum of 25 fields.", true);

        choices.forEach(function (c) {
            embed.addField(c.toString(), c.toString(), true)
        });

        message.channel.send({embed});

        /*for (let i = 0; i <= (choices.length - 1); i++) {
            for (let key in reactions) {
                if (key == i) {
                    console.log("key " + i + " has value " + reactions[i]);
                    // const emoji = bot.emojis.find(emoji => emoji.name === reactions[i].toString());
                    message.react("640414254423605267");
                }
            }
        }*/
    },
};