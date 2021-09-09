const Discord = require('discord.js');
const fs = require('fs');
const csv = require('csv-parser');
const bot = new Discord.Client();
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: './config/cryptos.csv',
    header: [
        {id: 'name', title: 'Name'}
    ]
});

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
                        console.log(bot.users.get('344551142916882442'));
                        console.log(bot.users.get('193467165389619211'));
                        if (value > 1 || value < 1) {
                            bot.users.get('344551142916882442').send(row.NAME + ' mérite ton attention, sa valeur actuelle est de ' + getMessage(value))
                            bot.users.get('193467165389619211').send(row.NAME + ' mérite ton attention, sa valeur actuelle est de ' + getMessage(value))
                        }
                    }
                    store.set('previous' + row.NAME, {value: ticker[row.NAME]})
                });
            })
            .on('end', () => {
                bot.channels.find('name', 'les-cryptos').send('J\'ai terminé de lire les cryptos.');
            })
        ;
    }, 1000 * 60 * 60);
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

    if (message.content.startsWith('!cryptoadd')) {
        message.reply("https://github.com/Ikxa/botdannov/blob/master/config/cryptos.csv");
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

