const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client();
const {Client} = require('pg');
const axios = require('axios');
const fetchEpic = require("./commands/epic");
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

let gameDB = [];
let prefix = '!';
let cpt = 0;
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/');

const fetchNewData = async () => {
    data = await fetchEpic();
    if (data.error) {
        // Checking if anything goes wrong 🤢
        console.log(data.error);
        return;
    }
    gameDB = data.ret;
};

const sendMessage = (channel) => {
    if (gameDB.length === 0) {
        // The empty game array means the data fetching failed
        channel.send("The bot is offline maybe a maintainace 🤒");
        return;
    }
    gameDB.map((elt) => {
        const embed = {
            title: elt.title,
            thumbnail: { url: elt.image },
            description: `Offer Ends: ${new Date(elt.offerTill).toLocaleString()}`,
            url: `https://www.epicgames.com/store/fr-FR/product/${elt.productSlug}`,
        };
        channel.send({ embed: embed });
    });
};

commandFiles.forEach((file) => {
    const command = require(`./commands/${file}`); // eslint-disable-line
    bot.commands.set(command.name, command);
});

bot.on('ready', (message) => {
    console.log('Bot ready');
}

bot.on('message', (message) => {
    if (message.content.startsWith("~")) {
        if (message.content === "~epic") {
            sendMessage(message.channel);
        }
    }

    if (message.author.bot) {
        return;
    }

    cpt++;
    if (cpt === 15) {
        // Changer la color des rôles
        let server = bot.guilds.get(message.guild.id).id;
        let guild = bot.guilds.get(server);
        guild.roles.forEach(role => {
            role.edit({
                color: "RANDOM"
            })
        })
        cpt = 0;
    }

    // Commande à exécuter
    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).split(' ');
        const commandName = args.shift().toLowerCase();
        if (!bot.commands.has(commandName)) return;
        const command = bot.commands.get(commandName);

        try {
            command.execute(message, args, bot);
        } catch (error) {
            console.error(error);
            message.reply('Error code 3 : Execute command');
        }
    }
});

(async () => {
    await fetchNewData();
})();


bot.login(process.env.TOKEN);

