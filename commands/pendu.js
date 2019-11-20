const fs = require("fs");
const readline = require('readline');

module.exports = {
    name: 'pendu',
    description: "Jouer au jeu du pendu, un mot du dictionnaire est tiré aléatoirement. Devinez le !",
    execute(message, args) {
        if (args[0] === 'start') {
            let file = './config/mots_dictionnaire.txt';
            let countLines = 0;
            let arrayOfLines = [];
            let randomWord = '';
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
            });

            for (let i = 0; i <= randomWord.length; i++) {
                randomWordHide += '_';
            }

            console.log(randomWordHide);
        }
    }
};
