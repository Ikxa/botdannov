module.exports = {
    name: 'color',
    description: "Changer les couleurs",
    execute(message, args, bot) {
        let server = bot.guilds.get('504272478537908226').id;
        let guild = bot.guilds.get(server);
        guild.roles.forEach(role => {
            role.edit({
                color: "RANDOM"
            })
        })
    }
};

