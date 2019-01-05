import * as client from "../database";

module.exports = {
    name: "brb",
    description: "Vous devez vous absenter ? Prévenez Bot Dan pour qu'il mette un message automatique !",
    execute(message, args) {
        if (args.length > 0) {
            let reason = args[0];
            client.connect((err, client, done) => {
                client.query('insert into users_afk (id, nickname, reason, is_active) values ($1, $2, $3, $4)',
                    [message.author.id, message.author.username], (err, result) => {
                        done(err);
                        console.log(result.rowCount);
                    });
            });
        }
    },
};