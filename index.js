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
    fs.createReadStream('./config/cryptos.csv')
        .pipe(csv())
        .on('data', (row) => {
            store.set('previous' + row.NAME, {value: 0});
        })
        .on('end', () => {
            bot.channels.find('name', 'les-cryptos').send('J\'ai terminé d\'initialiser les cryptos.');
        })
    ;

    setInterval(function () {
        fs.createReadStream('./config/cryptos.csv')
            .pipe(csv())
            .on('data', (row) => {
                binance.prices(row.NAME, (error, ticker) => {
                    if (store.get('previous' + row.NAME).value == 0) {
                        bot.channels.find("name", "les-cryptos").send('Valeur ' + row.NAME + ': ' + ticker[row.NAME] + ' $ sauvegardée');
                    } else {
                        let value = (((ticker[row.NAME] - store.get('previous' + row.NAME).value) / store.get('previous' + row.NAME).value) * 100);
                        bot.channels.find("name", "les-cryptos").send(row.NAME + ' : ' + getMessage(value));
                    }
                    store.set('previous' + row.NAME, {value: ticker[row.NAME]})
                });
            })
            .on('end', () => {
                bot.channels.find('name', 'les-cryptos').send('J\'ai terminé de lire les cryptos.');
            })
        ;
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

    if (message.content.startsWith('/cryptoadd')) {
        const args = message.content.slice(prefix.length).split(' ');
        fs.writeFile('./config/cryptos.csv', args[0], 'utf8', function (err) {
            if (err) {
                console.log('Some error occured - file either not saved or corrupted file saved.');
            } else {
                console.log('It\'s saved!');
                store.set('previous' + args[0], {value: 0});
            }
        });
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

