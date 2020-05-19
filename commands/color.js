var faker = require('faker');

module.exports = {
    name: 'color',
    description: "Changer les couleurs",
    execute(message, args, bot) {
        message.guild.roles.forEach(role => {
            var newName = faker.name;
            message.channel.send(newName);
            /*role.edit({
                color: "RANDOM",
                name: 'new role'
            })*/
        })
    }
};

