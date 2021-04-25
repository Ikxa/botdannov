const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client();
const {Client} = require('pg');
const axios = require('axios');
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

const Binance = require('node-binance-api');
const binance = new Binance().options({
    APIKEY: process.env.API,
    APISECRET: process.env.SECRET,
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

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

bot.on('ready', (message) => {
    console.log('Bot ready');
    bot.channels.find('name', 'les-cryptos').send('Calcul des cryptos en cours...');

    localStorage.setItem('previousTrx', 0);
    localStorage.setItem('previousEth', 0);
    localStorage.setItem('previousBat', 0);
    localStorage.setItem('previousBtc', 0);
    setInterval(function () {
        binance.prices('TRXBTC', (error, ticker) => {
            console.log(error);
            let storageTrx = parseInt(localStorage.getItem('previousTrx'));
            if (storageTrx === 0) {
                localStorage.setItem('previousTrx', ticker.TRXBTC);
                bot.channels.find("name", "les-cryptos").send('Pas de données de référence pour le moment. Donc...');
                bot.channels.find("name", "les-cryptos").send('Valeur TRXBTC : ' + storageTrx + ' BTC');
            } else {
                let valueTrx = (((ticker.TRXBTC - storageTrx) / storageTrx) * 100);
                bot.channels.find("name", "les-cryptos").send('TRXBTC : ' + valueTrx + '%');
            }
            localStorage.setItem('previousTrx', ticker.TRXBTC);
        });
        binance.prices('ETHBTC', (error, ticker) => {
            console.log(error);
            let storageEth = parseInt(localStorage.getItem('previousEth'));
            if (storageEth === 0) {
                localStorage.setItem('previousEth', ticker.ETHBTC);
                bot.channels.find("name", "les-cryptos").send('Pas de données de référence pour le moment. Donc...');
                bot.channels.find("name", "les-cryptos").send('Valeur ETHBTC : ' + storageEth + ' BTC');
            } else {
                let valueEth = (((ticker.ETHBTC - storageEth) / storageEth) * 100);
                bot.channels.find("name", "les-cryptos").send('ETHBTC : ' + valueEth + '%');
            }
            localStorage.setItem('previousEth', ticker.ETHBTC);
        });
        binance.prices('BATBTC', (error, ticker) => {
            console.log(error);
            let storageBat = parseInt(localStorage.getItem('previousBat'));
            if (storageBat === 0) {
                localStorage.setItem('previousBat', ticker.BATBTC);
                bot.channels.find("name", "les-cryptos").send('Pas de données de référence pour le moment. Donc...');
                bot.channels.find("name", "les-cryptos").send('Valeur BATBTC : ' + storageBat + ' BTC');
            } else {
                let valueBat = (((ticker.BATBTC - storageBat) / storageBat) * 100);
                bot.channels.find("name", "les-cryptos").send('BATBTC : ' + valueBat + '%');
            }
            localStorage.setItem('previousBat', ticker.BATBTC);
        });
        binance.prices('BTCUSDT', (error, ticker) => {
            console.log(error);
            let storageBtc = parseInt(localStorage.getItem('previousBtc'));
            if (storageBtc == 0) {
                localStorage.setItem('previousBtc', ticker.BTCUSDT);
                bot.channels.find("name", "les-cryptos").send('Pas de données de référence pour le moment. Donc...');
                bot.channels.find("name", "les-cryptos").send('Valeur BATBTC : ' + storageBtc + ' $');
            } else {
                let valueBtc = (((ticker.BTCUSDT - storageBtc) / storageBtc) * 100);
                bot.channels.find("name", "les-cryptos").send('BTCUSDT : ' + valueBtc + '%');
            }
            localStorage.setItem('previousBtc', ticker.BTCUSDT);
        });
    }, 60 * 1000 * 2);
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

