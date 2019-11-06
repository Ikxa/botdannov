module.exports = {
    name: "rn",
    description: "!rn limit - pour obtenir un nombre aléatoire entre 0 et votre limite",
    execute(message, args) {
        if (args.length > 0) {
            const number = Math.floor((Math.random() * args[0]) + 1);
            message.channel.send('Numéro aléatoire : ' + number);
        }
    },
};