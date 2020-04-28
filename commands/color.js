module.exports = {
    name: 'color',
    description: "Changer les couleurs",
    execute(message, args, bot) {
        let server = bot.guilds.get('504272478537908226');
        server.roles.forEach(role => {
            role.edit({
                color: "RANDOM"
            })
        })
    }
};

