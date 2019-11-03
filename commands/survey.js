module.exports = {
    name: "survey",
    description: "Lancez un sondage !",
    execute(message, args) {
        // const emoji = message.guild.emojis.find(emoji => emoji.name === 'ayy');
        // message.react(emoji);
        let question = [];
        args.forEach(function (a) {
            while (a !== '?') {
                question.push(a);
            }

            question.push('?');
        });

        console.log(question);
    },
};