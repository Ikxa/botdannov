const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client();
const {Client} = require('pg');
const axios = require('axios');
const Binance = require('node-binance-api');
const binance = new Binance().options({
    APIKEY: process.env.API,
    APISECRET: process.env.SECRET,
});
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

let gameDB = [];
let prefix = '!';
let cpt = 0;
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/');

commandFiles.forEach((file) => {
    const command = require(`./commands/${file}`); // eslint-disable-line
    bot.commands.set(command.name, command);
});

bot.on('ready', (message) => {
    console.log('Bot ready');
    binance.prevDay("TRXBTC", (error, prevDay, symbol) => {
        console.info("TRXBTC change since yesterday: "+prevDay.priceChangePercent+"%")
        bot.channels.find("name","les-cryptos").send("TRXBTC depuis hier: " + prevDay.priceChangePercent + "%")
    });
})

bot.on('message', (message) => {
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

bot.login(process.env.TOKEN);

