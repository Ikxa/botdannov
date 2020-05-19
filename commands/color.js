module.exports = {
    name: 'color',
    description: "Changer les couleurs",
    execute(message, args, bot) {
        var faker = require('faker');

        message.guild.roles.forEach(role => {
            var newName = faker.name.findName();
            message.channel.send(newName.toString());
            role.edit({
                color: "RANDOM",
                name: 'new role'
            })
        })
    }
};

