const fs = require("fs");
const readline = require('readline');
const {Client} = require('pg');

module.exports = {
    name: 'pendu',
    description: "Jouer au jeu du pendu, un mot du dictionnaire est tiré aléatoirement. Devinez le !",
    execute(message, args) {
        let randomWord = '';
        let file = './config/mots_dictionnaire.txt';
        let countLines = 0;
        let arrayOfLines = [];

        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: true
        });

        if (args[0] === 'start') {
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
                let randomNumber = Math.floor(Math.random() * Math.floor(countLines));
                randomWord = arrayOfLines[randomNumber].toLowerCase();
                client.connect((err, client) => {
                    client.query(
                        'insert into pendu (id, wordToGuess, wordLength) values (1, $1, $2)',
                        [message.author.id, randomWord, randomWord.length],
                        (err) => {
                            if (err !== null && err !== '') console.log(err);
                        }
                    );
                });
            });
        } else {
            let wordToGuess, wordLength;
            client.connect((err, client) => {
                client.query(
                    'select * from pendu',
                    (err, result) => {
                        if (err !== null && err !== '') console.log(err);
                        const rows = result.rows;
                        if (typeof rows[0] !== 'undefined') {
                            wordToGuess = rows[0]['wordToGuess'];
                            wordLength = rows[0]['wordLength'];
                        }
                    }
                );
            });

            if (args[0].length > 0 && args[0].length <= 1) {
                if (wordToGuess.contains(args[0].toString())) {
                    message.channel.send('Vous avez trouvé une lettre du mot à deviner !');
                }
            }
        }
    }
};
