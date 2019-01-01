module.exports = {
    name: "say",
    description: "Faites parler le bot !",
    execute(message, args) {
        const messageRepeat = args.join(" ");
        message.channel.send(messageRepeat);
        if (message.deletable) {
            message.delete();
        }
    },
};