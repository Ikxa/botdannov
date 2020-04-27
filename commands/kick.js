module.exports = {
    name: 'kick',
    description: "Kick une personne",
    execute(message, args, bot) {
        let member = message.mentions.members.first();
        let listMembers = bot.guilds.get("504272478537908226");
        if (member != null && message.author.id !== '344551142916882442') {
            member.kick().then((member) => {
                message.channel.send(member.displayName + ' a bien été kick, sah quel plaisir.');
            }).catch(() => {
                message.channel.send('Permission non accordée.');
            });
        } else {
            let random = listMembers.members.random();

            random.kick().then((random) => {
                message.channel.send(random.displayName + ' a bien été kick, sah quel plaisir.');
            }).catch(() => {
                message.channel.send('Permission non accordée.');
            });
        }
    }
};

