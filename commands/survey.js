module.exports = {
    name: "survey",
    description: "Lancez un sondage !",
    execute(message, args) {
        if (args.length > 0) {
            let args_array = args.filter(e => e !== '|');
            // console.log(args_array);
            message.channel.send('Sondage: ' + args_array[0])
        }
    },
};