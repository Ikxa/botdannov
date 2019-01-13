module.exports = {
    name: "survey",
    description: "Lancez un sondage !",
    execute(message, args) {
        if (args.length > 0) {
            let question = args.join(" ");
            console.log(question);
            // message.channel.send('Sondage: ' + args_array[0])
        }
    },
};