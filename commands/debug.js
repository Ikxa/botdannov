module.exports = {
    name: "debug",
    description: "Vérifier les types",
    execute(message, args) {
        if (args.length > 0) {
            message.member.send('Essai');
        }
    },
};