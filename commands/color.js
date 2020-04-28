module.exports = {
    name: 'color',
    description: "Changer les couleurs",
    execute(message, args, bot) {
        let server = bot.guilds;

        console.log(server);

        server.roles.forEach(role => {
            role.edit({
                color: "RANDOM"
            })
        })
    }
};

