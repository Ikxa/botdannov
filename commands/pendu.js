const fs = require("fs");
const readline = require('readline');

module.exports = {
    name: 'pendu',
    description: "Jouer au jeu du pendu, un mot du dictionnaire est tiré aléatoirement. Devinez le !",
    execute(message, args) {
        let randomWord;
        if (args[0] === 'start') {
            let file = './config/mots_dictionnaire.txt';
            let countLines = 0;
            let arrayOfLines = [];
            randomWord = '';
            let randomWordHide = '';
            let lives = 5;
            let rl = readline.createInterface({
                input: fs.createReadStream(file),
                output: process.stdout,
                terminal: false
            });

            rl.on('line', function (line) {
                countLines++;
                arrayOfLines.push(line);
            });

            rl.on('close', function () {
                // console.log(countLines);
                let randomNumber = Math.floor(Math.random() * Math.floor(countLines));
                randomWord = arrayOfLines[randomNumber].toLowerCase();

                randomWordHide = randomWord.replace(/_/g, "_");
                console.log(randomWord.toString());
                console.log(randomWordHide.toString());
            });


        } else {
            if (randomWord.contains(args[0].toString())) {
                message.channel.send('Vous avez trouvé une lettre !');
            } else {
                message.channel.send('Vous n\'avez pas trouvé une lettre !');
            }
        }
    }
};
