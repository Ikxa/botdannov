module.exports = {
    name: 'kick',
    description: "Kick une personne",
    execute(message, args, bot) {
        let member = message.mentions.members.first();
        if (member != null && message.author.id !== '344551142916882442') {
            member.kick().then((member) => {
                message.channel.send(member.displayName + ' a bien été kick, sah quel plaisir.');
            }).catch(() => {
                message.channel.send('Permission non accordée.');
            });
        } else {
            message.channel.send('Adrien arrête.');
            return;
        }
    }
};

