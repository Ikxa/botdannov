var faker = require('faker/locale/fr');

module.exports = {
    name: 'color',
    description: "Changer les couleurs et les noms",
    execute(message, args, bot) {
        message.guild.roles.forEach(role => {
            let newName = faker.address.city();
            role.edit({
                color: "RANDOM",
                name: newName.toString()
            })
        })
    }
};

