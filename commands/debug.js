module.exports = {
    name: "debug",
    description: "Vérifier les types",
    execute(message, args) {
        if (args.length > 0) {
            let member = message.mentions.users.first();
            message.channel.send(typeof member);
        }
    },
};