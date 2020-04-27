module.exports = {
    name: 'kick',
    description: "Kick une personne",
    execute(message, args, bot) {
        let member = message.mentions.members.first();
        if (member != null) {
            member.kick().then((member) => {
                message.channel.send(member.displayName + ' a bien été kick, sah quel plaisir.');
            }).catch(() => {
                message.channel.send('Permission non accordée.');
            });
        }
    }
};

