const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client();
const maintenance = false;

const { Client } = require('pg');

/* TODO : Cannot read property of undefined */
const client = new Client({
	connectionString : process.env.DATABASE_URL,
	ssl              : true
});

let prefix = '!';

bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/');

commandFiles.forEach((file) => {
	const command = require(`./commands/${file}`); // eslint-disable-line
	bot.commands.set(command.name, command);
});

bot.on('ready', () => {
	bot.user.setActivity('Justin à poil', { type: 'WATCHING' }).catch((err) => console.error(err));
	console.log('Bot ready');
	// Database connection
	client.connect((err, client) => {
		// Create table for users_afk
		client.query(
			'create table if not exists users_afk( \
                id text primary key, \
                nickname text, \
                reason text, \
                is_active integer default 1)',
			(err, result) => {
				//disconnent from database on error
				if (err !== null && err !== '') console.log(err);
			}
		);
	});
});

bot.on('disconnected', () => {
	bot.login(process.env.TOKEN).catch((err) => console.error(err));
});

bot.on('message', (message) => {
	const thisWord = 'fart';
	if (message.content.includes(thisWord)) {
		message.delete(1000);
		message.channel.sendMessage('**@&#$%!**');
		for ($i = 0; $i <= 100; $i++) {
			message.author.send('Le mot **FART** est interdit!');
		}
	}

	if (message.startsWith('.')) {
		message.channel.send('Le préfix a changé, utilisez le ! désormais.');
	}

	if (message.author.id == 453121034988683265) {
		return;
	}

	if (message.author.bot) {
		return;
	}

	// TODO: Fonctionne correctement !
	// id de l'utilisateur mentionné : **user_mentioned.id**
	// résultat de la requête : **result.rows**
	// rows = [ { reason: 'PauseCaca' } ]
	// raison de l'afk : rows[0].reason
	const user_mentioned = message.mentions.users.first();
	if (message.isMentioned(user_mentioned) && typeof user_mentioned != 'undefined') {
		const client = new Client({
			connectionString : process.env.DATABASE_URL,
			ssl              : true
		});
		client.connect((err, client) => {
			client.query(
				'select reason from users_afk \
                where is_active = 1 and id = $1',
				[ user_mentioned.id ],
				(err, result) => {
					if (err !== null && err !== '') console.log(err);
					const rows = result.rows;
					if (typeof rows[0] !== 'undefined') {
						message.channel.send(
							'Désolé, ' + user_mentioned + " s'est absenté pour la raison suivante : " + rows[0].reason
						);
					}
				}
			);
		});
	}

	// Command execution
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
