module.exports = {
    name: 'color',
    description: "Changer les couleurs",
    execute(message, args, bot) {
        message.guild.roles.forEach(role => {
            role.edit({
                color: "RANDOM"
            })
        })
    }
};

