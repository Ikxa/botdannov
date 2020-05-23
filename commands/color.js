var faker = require('faker/locale/fr');

module.exports = {
    name: 'color',
    description: "Changer les couleurs et les noms",
    execute(message, args, bot) {
        message.guild.roles.forEach(role => {

            let names = [
                "Les Bonnets d’Âne",
                "Les Congolais",
                "Les Ventriloques",
                "Mimie Mathy Fan Club",
                "Les Petits Sexes",
                "Les Gros Sexes",
                "Les Juifs",
                "Les Mecs Pas Drôles",
                "Les Muets",
                "Les Petites Salopes",
                "Les Hommes Nus",
                "Les Castrés",
                "NaCL",
                "Professeurs Raoult",
                "Les Chevaucheurs de Chevaux",
                "Les Titounis",
                "Les Tracteurs",
                "Les Fermiers"
            ];

            let newName = faker.random.arrayElement(names);

            role.edit({
                color: "RANDOM",
                name: newName.toString().toUpperCase()
            });

            names.splice(names.indexOf(newName), 1);

        })
    }
};

