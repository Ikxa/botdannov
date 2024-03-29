module.exports = {
    name: "help",
    description: "Quelles commandes sont dispo ?",
    execute(message, args) {
        const help = [];
        const {commands} = message.client;
        help.push(commands.map(command => `**.${command.name}** : ${command.description}`).join("\n"));

        message.author.send(help);
    },
};