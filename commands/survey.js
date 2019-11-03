module.exports = {
    name: "survey",
    description: "Lancez un sondage !",
    execute(message, args) {
        // const emoji = message.guild.emojis.find(emoji => emoji.name === 'ayy');
        // message.react(emoji);
        args.forEach(function (e) {
            console.log(e);
        });
    },
};