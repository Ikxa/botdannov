var faker = require('faker');

module.exports = {
    name: 'color',
    description: "Changer les couleurs et les noms",
    execute(message, args, bot) {
        faker.locale = "fr";
        message.guild.roles.forEach(role => {
            let newName = faker.name.jobDescriptor();
            role.edit({
                color: "RANDOM",
                name: newName.toString()
            })
        })
    }
};

