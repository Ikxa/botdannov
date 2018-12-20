module.exports = {
    name: "rd",
    description: "Get a random number",
    execute(message, args) {
        const limit = parseInt(args.join(" "));
        let number = Math.floor((Math.random() * limit) + 1);
        message.channel.send('Numéro aléatoire :' + number);
    },
};