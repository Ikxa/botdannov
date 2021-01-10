var faker = require('faker/locale/fr');

module.exports = {
    name: 'color',
    description: "Changer les couleurs et les noms",
    execute(message, args, bot) {
        let names = [
            "les Hurleurs",
            "les Vikings Enchantés",
            "les Coyotes Impossibles",
            "les Spartiates",
            "les Chattes Amères",
            "les Bouledogues",
            "les Cerfs Jouyeux",
            "les Blizzards Généreux",
            "les Feux Dingues",
            "les Crocodiles",
            "les Bouffons",
            "les Rhinocéros",
            "les Enfers Grizzly",
            "les Braves Nobles",
            "les Saints Austères",
            "les Dindes Furieuses",
            "les Hamsters Anciens",
            "les Terrifiants",
            "les Anacondas Majestueux",
            "les Prodiges Unifiés",
            "les Guêpes Colossauses",
            "les Kangourous Grandioses",
            "les Loups-Garous Fous",
            "les Phacochères Brillants",
            "les Gladiateurs Squelettiques",
            "les Dinosaures Hardis",
            "les Formidables",
            "les Inouïes",
            "les Orangs-Outans Colossaux",
            "les Vipères Horribles",
            "les Dingos Fâchés",
            "les Zèbres Célestes",
            "les Chevaux Phénoménaux",
            "les Flammes Géniauses",
            "les Tornades Chaudes",
            "les Faucons Fâchés",
            "les Griffons Unis",
            "les Bleus",
            "les Jouyeuses",
            "les Extraterrestres Sérieux",
            "les Géantes",
            "les Douées",
            "les Dorés",
            "les Ânes Furieux",
            "les Inventifs",
            "les Mouettes Austères",
            "les Louves",
            "les Canards",
            "les Mages Horribles",
            "les Chats",
            "les Rossignols Avides",
            "les Diablotins Implacables",
            "les Autruches Spectaculaires",
            "les Élevées",
            "les Orques Audacieux",
            "les Exaltés",
            "les Mages Libres",
            "les Rêves Vaillants",
            "les Furies",
            "les Castors Joyeux",
            "les Boulons Tranquilles",
            "les Sangliers Tranquilles",
            "les Ocelots Dynamiques",
            "les Unies",
            "les Phacochères Ingénieux",
            "les Créatifs",
            "les Pirates",
            "les Autruches Impossibles",
            "les Bouffons",
            "les Intelligents"
        ];

        message.guild.roles.forEach(role => {
            let newName = faker.random.arrayElement(names);
            role.edit({
                color: "RANDOM",
                name: newName.toString().toUpperCase()
            });
            names.splice(names.indexOf(newName), 1);
        })
    }
};

