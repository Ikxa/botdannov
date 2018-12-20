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
        let Lowki = ["League of Legends", "Rocket League", "Brawlhalla", "H1Z1", "PUBG", "CS:Go", "Dofus", "Battlefield V", "Fifa", "Witch it", "Business Tour", "Minecraft", "Gang Beast", "Overcooked"];
        let res = compare(Jordan, Lowki);
        let randomNumber = Math.floor(Math.random() * res.length);

        message.channel.send('Vous devez jouer à : ' + res[randomNumber]);
    },
};