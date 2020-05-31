module.exports = {
    name: 'avatar',
    description: "Quel est mon avatar ?",
    execute(message, args, bot) {
        message.channel.send(message.author.displayAvatarURL());
    }
};

