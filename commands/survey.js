module.exports = {
    name: "survey",
    description: "Lancez un sondage !",
    execute(message, args) {
        if (args.length > 0) {
            let question = args.join(" ");
            let question_split = question.split('|');
            console.log(question);
            console.log(question_split);
            // message.channel.send('Sondage: ' + args_array[0])
        }
    },
};