const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client();

/*const {Client} = require('pg');
const axios = require('axios');
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});*/

var store = require('store');
store.set('previousTrx', {value: 0});
store.set('previousEth', {value: 0});
store.set('previousBat', {value: 0});
store.set('previousBtc', {value: 0});

let rawdata = fs.readFileSync('config/cryptos.json');
let cryptos = JSON.parse(rawdata);
// console.log(cryptos.cryptos);

cryptos.forEach(element => console.log(element))

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

bot.on('ready', async message => {
    console.log('Bot ready');
    bot.channels.find('name', 'les-cryptos').send('Calcul des cryptos en cours...');

    setInterval(function () {
        bot.channels.find('name', 'les-cryptos').send((new Date()).toLocaleString());
        binance.prices('TRXBTC', (error, ticker) => {
            if (store.get('previousTrx').value == 0) {
                bot.channels.find("name", "les-cryptos").send('Valeur TRXBTC : ' + ticker.TRXBTC + ' BTC sauvegardée 🚀');
            } else {
                let valueTrx = (((ticker.TRXBTC - store.get('previousTrx').value) / store.get('previousTrx').value) * 100);
                bot.channels.find("name", "les-cryptos").send('TRXBTC : ' + getMessage(valueTrx));
            }
            store.set('previousTrx', {value: ticker.TRXBTC})
        });
        binance.prices('ETHBTC', (error, ticker) => {
            if (store.get('previousEth').value == 0) {
                bot.channels.find("name", "les-cryptos").send('Valeur ETHBTC : ' + ticker.ETHBTC + ' BTC sauvegardée');
            } else {
                let valueEth = (((ticker.ETHBTC - store.get('previousEth').value) / store.get('previousEth').value) * 100);
                bot.channels.find("name", "les-cryptos").send('ETHBTC : ' + getMessage(valueEth));
            }
            store.set('previousEth', {value: ticker.ETHBTC})
        });
        binance.prices('BATBTC', (error, ticker) => {
            if (store.get('previousBat').value == 0) {
                bot.channels.find("name", "les-cryptos").send('Valeur BATBTC : ' + ticker.BATBTC + ' BTC sauvegardée');
            } else {
                let valueBat = (((ticker.BATBTC - store.get('previousBat').value) / store.get('previousBat').value) * 100);
                bot.channels.find("name", "les-cryptos").send('BATBTC : ' + getMessage(valueBat));
            }
            store.set('previousBat', {value: ticker.BATBTC})
        });
        binance.prices('BTCUSDT', (error, ticker) => {
            if (store.get('previousBtc').value == 0) {
                bot.channels.find("name", "les-cryptos").send('Valeur BTCUSDT : ' + ticker.BTCUSDT + ' $ sauvegardée');
            } else {
                let valueBtc = (((ticker.BTCUSDT - store.get('previousBtc').value) / store.get('previousBtc').value) * 100);
                bot.channels.find("name", "les-cryptos").send('BTCUSDT : ' + getMessage(valueBtc));
            }
            store.set('previousBtc', {value: ticker.BTCUSDT})
        });
        bot.channels.find('name', 'les-cryptos').send('---');
    }, 60 * 1000);
})

bot.on('message', (message) => {
    if (message.author.bot) {
        return;
    }

    /*    if (message.content.startsWith(prefix + 'cryptoadd')) {
            const args = message.content.slice(prefix.length).split(' ');
            store.set(args[1], {value: 0});
            store.set(args[2], {crypto: 0});
        }*/

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

function getMessage(value) {
    switch (value) {
        case value >= 0:
            return value + ' % 😁'
        case value < 0:
            return value + ' % 🙄'
        case value > 1:
            return value + ' % 🚀'
        default:
            return value + ' %'
    }
}

