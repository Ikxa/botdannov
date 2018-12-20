module.exports = {
    name: "rd",
    description: "Get a random number",
    execute(message, args) {
        // const limit = parseInt(args.join(" "));
        if (args.length > 0) {
            const number = Math.floor((Math.random() * args[0]) + 1);
            message.channel.send('Numéro aléatoire :' + number);
        }
    },
};