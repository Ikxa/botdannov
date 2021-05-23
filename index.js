const Discord = require('discord.js');
const fs = require('fs');
const csv = require('csv-parser');
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

bot.on('ready', message => {
    bot.channels.find('name', 'les-cryptos').send('Bot ready');

    fs.createReadStream('./config/cryptos.csv')
        .pipe(csv())
        .on('data', (row) => {
            console.log('row', row.NAME);
        })
        .on('end', () => {
            console.log('CSV successfully read !');
        })

    bot.channels.find('name', 'les-cryptos').send('Si pas de message autre que bot ready, problème');

    /*bot.channels.find('name', 'les-cryptos').send('Calcul des cryptos en cours...');
    setInterval(function () {
        bot.channels.find('name', 'les-cryptos').send('**' + (new Date()).toLocaleString('fr-FR', {timeZone: 'UTC'}) + '**');
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
    }, 60 * 1000);*/
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

function getMessage(value) {
    switch (value) {
        case (parseInt(value) >= 0):
            return value.toFixed(3) + ' % 😁'
        case (parseInt(value) < 0):
            return value.toFixed(3) + ' % 🙄'
        case (parseInt(value) > 1):
            return value.toFixed(3) + ' % 🚀'
        default:
            return value.toFixed(3) + ' %'
    }
}

