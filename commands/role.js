module.exports = {
    name: 'kick',
    description: "Kick une personne",
    execute(message, args, bot) {
        message.guild.roles.create({
            data: {
                name: 'Super Cool People',
                color: 'BLUE',
            },
            reason: 'we needed a role for Super Cool People',
        })
            .then(console.log)
            .catch(console.error);
    }
};

