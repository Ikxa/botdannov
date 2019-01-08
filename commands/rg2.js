const {Client} = require('pg');

module.exports = {
    name: "rg2",
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
            const client = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: true,
            });

            client.connect((err, client) => {
                client.query('select * from players_games', (err, result) => {
                    if (err !== null && err !== '') console.log(err);
                    console.log(result);
                });
            });
        }
    },
};