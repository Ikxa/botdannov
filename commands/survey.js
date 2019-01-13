const Discord = require("discord.js");
const bot = new Discord.Client();

module.exports = {
    name: "survey",
    description: "Lancez un sondage !",
    execute(message, args) {
        if (args.length > 0) {
            const one = bot.emojis.get("533885431247536129");
            let question = args.join(" ");
            let question_split = question.split('|');
            message.channel.send('**SONDAGE**: ' + question_split[0]);
            message.react("533885431247536129");
            // console.log(question);
            // console.log(question_split);
            // message.channel.send('Sondage: ' + args_array[0])
        }
    },
};