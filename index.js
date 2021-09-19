const Discord = require('discord.js');
const fs = require('fs');
const csv = require('csv-parser');
const bot = new Discord.Client();
var store = require('store');

const Binance = require('node-binance-api');
const {Chart} = require("chart.js");
const binance = new Binance().options({
    APIKEY: process.env.API,
    APISECRET: process.env.SECRET,
});
const crytosValue = [];
let crytosValueByTime = [];


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
            bot.channels.find('name', 'les-cryptos').send('J\'ai lu les cryptos souhaitées dans le csv.');
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
                        crytosValue[row.NAME] = value;
                        // >> "09/08/2014, 2:35:56 AM"
                        crytosValueByTime[row.name] = {value: value, time: new Date().toLocaleString()}
                    }
                    store.set('previous' + row.NAME, {value: ticker[row.NAME]})
                });
            })
            .on('end', () => {
                bot.channels.find('name', 'les-cryptos').send('J\'ai terminé de lire les cryptos.');
            })
        ;
    }, 1000 * 60 * 30);

    setInterval(function () {
        for (const [key, value] of Object.entries(crytosValue)) {
            console.log(key, value);
            if (parseInt(value) > 2 || parseInt(value) < -2) {
                bot.users.get('344551142916882442').send(key + ' mérite ton attention, sa valeur actuelle est de ' + getMessage(value))
                bot.users.get('193467165389619211').send(key + ' mérite ton attention, sa valeur actuelle est de ' + getMessage(value))
            }
        }
    }, 1000 * 60 * 33);

    var dayInMilliseconds = 1000 * 60 * 60 * 24;
    setInterval(function() {
        createChart();
    }, dayInMilliseconds);
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
        case (value >= 0):
            return value.toFixed(3) + ' % 😁'
        case (value < 0):
            return value.toFixed(3) + ' % 🙄'
        case (value > 1):
            return value.toFixed(3) + ' % 🚀'
        default:
            return value.toFixed(3) + ' %'
    }
}

function createChart() {
    if (crytosValueByTime.length === 12) {
        var ctx = document.getElementById('myChart');
        var labels = [];
        var values = [];

        for (const [key, value] of Object.entries(crytosValueByTime)) {
            labels.push(key);
            values.push(value);
        }

        var myChart = new Chart(ctx, {
            type: 'line',
            labels: labels,
            datasets: [{
                label: 'Evolution every 24 hours',
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        })
        crytosValueByTime = [];
    }
}