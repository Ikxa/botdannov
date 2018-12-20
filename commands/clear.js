const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = {
    name: "clear",
    description: "Supprimer un certain nombre de message",
    execute(message, args) {
        client.on("message", async => message => {
            if (args.length > 0) {
                const deleteCount = parseInt(args[0], 10);

                if(!deleteCount || deleteCount < 2 || deleteCount > 100)
                    return message.reply("Merci d'indiquer un nombre en 1 et 10 message(s) à supprimer");

                const fetched = await message.channel.fetchMessages({limit: deleteCount});
                message.channel.bulkDelete(fetched)
                    .catch(error => message.reply(`Je ne peux pas supprimer les messages car : ${error}`));
            }
        })
    },
};