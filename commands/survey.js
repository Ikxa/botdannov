module.exports = {
    name: "survey",
    description: "Lancez un sondage !",
    execute(message, args) {
        // const emoji = message.guild.emojis.find(emoji => emoji.name === 'ayy');
        // message.react(emoji);
        let argSplitted = args.split('||');
        console.log(argSplitted);
    },
};