module.exports = {
    name: "survey",
    description: "Lancez un sondage !",
    execute(message, args) {
        if (args.length > 0) {
            let args_array = message.split('|', args.length);
            console.log(args_array);
        }
    },
};