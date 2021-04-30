const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client();
const {Client} = require('pg');
const axios = require('axios');
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

var store = require('store');
store.set('values', {previousTrx: 1, previousEth: 2, previousBat: 3, previousBtc: 4});

const Binance = require('node-binance-api');
const binance = new Binance().options({
    APIKEY: process.env.API,
    APISECRET: process.env.SECRET,
});

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
    bot.channels.find('name', 'les-cryptos').send('Calcul des cryptos en cours...');

    setInterval(function () {
        binance.prices('TRXBTC', (error, ticker) => {
            let trx = parseInt(store.get('values').previousTrx);
            bot.channels.find("name", "les-cryptos").send('Valeur TRXBTC : ' + trx + ' sauvegardée');
            store.set('values', {previousTrx: ticker.TRXBTC, previousEth: 0, previousBat: 0, previousBtc: 0})
            bot.channels.find("name", "les-cryptos").send('Valeur TRXBTC : ' + trx + ' sauvegardée');
            bot.channels.find("name", "les-cryptos").send('Valeur TRXBTC : ' + store.get('values').previousTrx + ' sauvegardée');


            // if (trx === 0) {
            //     store.set('values', {previousTrx: ticker.TRXBTC, previousEth: 0, previousBat: 0, previousBtc: 0})
            //     bot.channels.find("name", "les-cryptos").send('Valeur TRXBTC : ' + store.get('values').previousTrx + ' BTC sauvegardée');
            // } else {
            //     let valueTrx = (((ticker.TRXBTC - store.get('values').previousTrx) / store.get('values').previousTrx) * 100);
            //     bot.channels.find("name", "les-cryptos").send('TRXBTC : ' + valueTrx + '%');
            // }
            // store.set('values', {previousTrx: ticker.TRXBTC, previousEth: 0, previousBat: 0, previousBtc: 0})
        });
        /*binance.prices('ETHBTC', (error, ticker) => {
            let eth = store.get('values').previousEth;
            if (parseInt(eth) === 0) {
                store.set('values', {previousTrx: 0, previousEth: ticker.ETHBTC, previousBat: 0, previousBtc: 0})
                bot.channels.find("name", "les-cryptos").send('Valeur ETHBTC : ' + store.get('values').previousEth + ' BTC sauvegardée');
            } else {
                let valueEth = (((ticker.ETHBTC - store.get('values').previousEth) / store.get('values').previousEth) * 100);
                bot.channels.find("name", "les-cryptos").send('ETHBTC : ' + valueEth + '%');
            }
            store.set('values', {previousTrx: 0, previousEth: ticker.ETHBTC, previousBat: 0, previousBtc: 0})
        });*/
        /*binance.prices('BATBTC', (error, ticker) => {
            if (typeof error === "undefined" || error !== null) {
                bot.channels.find('name', 'les-cryptos').send('Une erreur a été trouvée pour le BATBTC');
                console.log(error);
            }
            if (store.get('values').previousBat == 0) {
                store.set('values', {previousTrx: 0, previousEth: 0, previousBat: ticker.BATBTC, previousBtc: 0})
                bot.channels.find("name", "les-cryptos").send('Valeur BATBTC : ' + store.get('values').previousBat + ' BTC sauvegardée');
            } else {
                let valueBat = (((ticker.BATBTC - store.get('values').previousBat) / store.get('values').previousBat) * 100);
                bot.channels.find("name", "les-cryptos").send('BATBTC : ' + valueBat + '%');
            }
            store.set('values', {previousTrx: 0, previousEth: 0, previousBat: ticker.BATBTC, previousBtc: 0})
        });
        binance.prices('BTCUSDT', (error, ticker) => {
            if (typeof error === "undefined" || error !== null) {
                bot.channels.find('name', 'les-cryptos').send('Une erreur a été trouvée pour le BTCUSDT');
                console.log(error);
            }
            if (store.get('values').previousBtc == 0) {
                store.set('values', {previousTrx: 0, previousEth: 0, previousBat: 0, previousBtc: ticker.BTCUSDT})
                bot.channels.find("name", "les-cryptos").send('Valeur BTCUSDT : ' + store.get('values').previousBtc + ' $ sauvegardée');
            } else {
                let valueBtc = (((ticker.BTCUSDT - store.get('values').previousBtc) / store.get('values').previousBtc) * 100);
                bot.channels.find("name", "les-cryptos").send('BTCUSDT : ' + valueBtc + '%');
            }
            store.set('values', {previousTrx: 0, previousEth: 0, previousBat: 0, previousBtc: ticker.BTCUSDT})
        });*/
    }, 60 * 1000);
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

