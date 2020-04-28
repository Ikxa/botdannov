module.exports = {
    name: 'color',
    description: "Changer les couleurs",
    execute(message, args, bot) {
        let server = bot.guilds.first();

        console.log(server.roles);

        server.roles.forEach(role => {
            role.edit({
                color: "RANDOM"
            })
        })
    }
};

