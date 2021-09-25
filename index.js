const Discord = require('discord.js');
const bot = new Discord.Client();

const fs = require('fs');
const csv = require('csv-parser');
let store = require('store');

const Binance = require('node-binance-api');
const binance = new Binance().options({
    APIKEY: process.env.API,
    APISECRET: process.env.SECRET,
});
const crytosValue = [];


let prefix = '!';
let cpt = 0;
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/');
let channel = null;

commandFiles.forEach((file) => {
    const command = require(`./commands/${file}`); // eslint-disable-line
    bot.commands.set(command.name, command);
});

bot.once("ready", async () => {
    channel = await bot.channels.fetch("835793675534467103")
});

bot.on('ready', message => {
    fs.createReadStream('./config/cryptos.csv')
        .pipe(csv())
        .on('data', (row) => {
            store.set('previous' + row.NAME, {value: 0});
        })
        .on('end', () => {
            // bot.channels.find('name', 'les-cryptos').send('J\'ai lu les cryptos souhaitées dans le csv.');
            channel.send('J\'ai lu les cryptos souhaitées dans le csv.');
        })
    ;

    setInterval(function () {
        fs.createReadStream('./config/cryptos.csv')
            .pipe(csv())
            .on('data', (row) => {
                binance.prices(row.NAME, (error, ticker) => {
                    if (store.get('previous' + row.NAME).value == 0) {
                        channel.send('Valeur ' + row.NAME + ': ' + ticker[row.NAME] + ' $ sauvegardée');
                    } else {
                        let value = (((ticker[row.NAME] - store.get('previous' + row.NAME).value) / store.get('previous' + row.NAME).value) * 100);
                        channel.send(row.NAME + ' : ' + getMessage(value));
                        crytosValue[row.NAME] = value;
                    }
                    store.set('previous' + row.NAME, {value: ticker[row.NAME]})
                });
            })
            .on('end', () => {
                channel.send('J\'ai terminé de lire les cryptos.');
            })
        ;
    }, 1000 * 60 * 40);

    setInterval(async function () {
        for (const [key, value] of Object.entries(crytosValue)) {
            if (parseInt(value) > 2 || parseInt(value) < -2) {
                try {
                    let userJ = await bot.users.fetch('193467165389619211');
                    let userA = await bot.users.fetch('344551142916882442');
                    await bot.users.cache.get(userJ.id).send(key + ' mérite ton attention, sa valeur actuelle est de ' + getMessage(value));
                    await bot.users.cache.get(userA.id).send(key + ' mérite ton attention, sa valeur actuelle est de ' + getMessage(value));
                } catch (error) {
                    console.error(error);
                }
            }
        }
    }, 1000 * 60 * 50);

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