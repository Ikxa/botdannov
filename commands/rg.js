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

        if (args.length > 0) {
            let arg0 = args[0].toUpperCase();
            let arg1 = args[1].toUpperCase();
            let JORDAN = ["League of Legends", "Rocket League", "Brawlhalla", "H1Z1", "PUBG", "CS:Go", "Dofus", "Battlefield V", "Fifa 18", "Witch it", "Business Tour", "Minecraft", "DayZ"];
            let LOWKI = ["League of Legends", "Rocket League", "CS:Go", "Dofus", "Battlefield V", "Fifa 18", "DayZ"];
            let ADRIEN = ["Rocket League", "League of Legends", "Fifa 18", "Fifa 19", "PUBG", "Minecraft", "CS:Go", "Brawlallah"];
            let FIFFOU = ["Battlefield V"];

            switch (arg0) {
                case 'JORDAN':
                    arg0 = JORDAN;
                    break;
                case 'LOWKI':
                    arg0 = LOWKI;
                    break;
                case 'ADRIEN':
                    arg0 = ADRIEN;
                    break;
                case 'FIFFOU':
                    arg0 = FIFFOU;
                    break;
            }

            switch (arg1) {
                case 'JORDAN':
                    arg1 = JORDAN;
                    break;
                case 'LOWKI':
                    arg1 = LOWKI;
                    break;
                case 'ADRIEN':
                    arg1 = ADRIEN;
                    break;
                case 'FIFFOU':
                    arg1 = FIFFOU;
                    break;
            }

            let finalComparison = compare(arg0, arg1);
            let randomNumber = Math.floor(Math.random() * finalComparison.length);

            message.channel.send('Vous devez jouer à : ' + finalComparison[randomNumber]);
        } else {
            let games = ["League of Legends", "Rocket League", "H1Z1", "PUBG", "CS:Go", "Dofus", "Battlefield V", "Fifa 18", "DayZ", "Brawlhalla", "Minecraft", "Witch it", "Business Tour"];
            let randomNumber = Math.floor(Math.random() * games.length);

            message.channel.send('Vous devez jouer à : ' + games[randomNumber]);
        }
    },
};