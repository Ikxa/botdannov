const Discord = require("discord.js");
const bot = new Discord.Client();

module.exports = {
    name: "debug",
    description: "Vérifier les types",
    execute(message) {
        let member = message.guild.fetchMember('193467165389619211')
        if (member !== null && typeof(member) !== 'undefined') {
            message.sendMessage(member, 'Salut Jordan!');
            console.log(member);
        }
    },
};