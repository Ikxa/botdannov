const fs = require("fs");

module.exports = {
    name: "rg",
    description: "Vous ne savez pas à quoi jouer ? Demandez !",
    execute(message, args) {
        function compare(arr1, arr2) {
            const finalArray = [];

            arr1.forEach((e1) => arr2.forEach((e2) => {
                if (e1 === e2) {
                    finalArray.push(e1);
                }
            }));

            return finalArray;
        }

        let Jordan = ["League of Legends", "Rocket League", "Brawlhalla", "H1Z1", "PUBG", "CS:Go", "Dofus", "Battlefield V", "Fifa", "Witch it", "Business Tour", "Minecraft", "Gang Beast", "Overcooked"];
        let Lowki = ["League of Legends", "Rocket League", "CS:Go", "Dofus", "Battlefield V", "Fifa"];
        let Adrien = ["League of Legends"];
        let Fiffou = ["Battlefield V"];

        switch (args[0]) {
            case 'Jordan':
                args[0] = Jordan;
                break;
            case 'Lowki':
                args[0] = Lowki;
                break;
            case 'Adrien':
                args[0] = Adrien;
                break;
            case 'Fiffou':
                args[0] = Fiffou;
                break;
        }

        switch (args[1]) {
            case 'Jordan':
                args[1] = Jordan;
                break;
            case 'Lowki':
                args[1] = Lowki;
                break;
            case 'Adrien':
                args[1] = Adrien;
                break;
            case 'Fiffou':
                args[1] = Fiffou;
                break;
        }

        let finalComparison = compare(args[0], args[1]);
        let randomNumber = Math.floor(Math.random() * finalComparison.length);

        message.channel.send('Vous devez jouer à : ' + finalComparison[randomNumber]);
    },
};