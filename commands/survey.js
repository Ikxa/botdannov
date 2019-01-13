module.exports = {
    name: "survey",
    description: "Lancez un sondage !",
    execute(message, args) {
        if (args.length > 0) {
            let str = message.toString();
            let args_array = str.split('|', args.length);
            console.log(args_array);
            console.log('Args');
            console.log(args);
        }
    },
};