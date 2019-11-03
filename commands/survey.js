module.exports = {
    name: "survey",
    description: "Lancez un sondage !",
    execute(message, args) {
        // const emoji = message.guild.emojis.find(emoji => emoji.name === 'ayy');
        // message.react(emoji);
        const argsJoined = args.join(" ");
        console.log(argsJoined);
        let argsSplitted = argsJoined.split("?");
        console.log(argsSplitted);
    },
};