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

        message.channel.send(question);
        choices.forEach(function (c) {
            message.channel.send(c.toString());
        });

        const embed = new Discord.RichEmbed()
            .setTitle("This is your title, it can hold 256 characters")
            .setAuthor("Author Name", "https://i.imgur.com/lm8s41J.png")
            /*
             * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
             */
            .setColor(0x00AE86)
            .setDescription("This is the main body of text, it can hold 2048 characters.")
            .setFooter("This is the footer text, it can hold 2048 characters", "http://i.imgur.com/w1vhFSR.png")
            .setImage("http://i.imgur.com/yVpymuV.png")
            .setThumbnail("http://i.imgur.com/p2qNFag.png")
            /*
             * Takes a Date object, defaults to current date.
             */
            .setTimestamp()
            .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
            .addField("This is a field title, it can hold 256 characters",
                "This is a field value, it can hold 1024 characters.")
            /*
             * Inline fields may not display as inline if the thumbnail and/or image is too big.
             */
            .addField("Inline Field", "They can also be inline.", true)
            /*
             * Blank field, useful to create some space.
             */
            .addBlankField(true)
            .addField("Inline Field 3", "You can have a maximum of 25 fields.", true);

        message.channel.send({embed});

        for (let i = 0; i <= (choices.length - 1); i++) {
            for (let key in reactions) {
                if (key == i) {
                    console.log("key " + i + " has value " + reactions[i]);
                    // const emoji = bot.emojis.find(emoji => emoji.name === reactions[i].toString());
                    message.react("640414254423605267");
                }
            }
        }
    },
};