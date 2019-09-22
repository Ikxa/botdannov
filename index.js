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

		client.query(
			'create table if not exists counter_msg( \
                id text primary key, \
                nickname text, \
                nb integer)',
			(err, result) => {
				//disconnent from database on error
				if (err !== null && err !== '') console.log(err);
			}
		);

		client.query(
			'create table if not exists chifoumi( \
                id text primary key, \
                nickname text, \
                scoreUser integer default 0, \
                scoreComputer integer default 0)',
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
	if (!message.author.bot) {
		message.reply(message.author);
		message.reply(typeof message.author.toString());

		client.query(
			'select id, nickname, nb from counter_msg \
            where nickname = $1',
			[ message.author.toString() ],
			(err, result) => {
				if (err !== null && err !== '') console.log(err);
				const rows = result.rows;
				console.log(rows);
				if (typeof rows[0] !== 'undefined') {
					/** UPDATE **/
					client.query(
						'update counter_msg set nb = $1 where nickname = $2',
						[ nb + 1, message.author.username.toString() ],
						(err) => {
							if (err !== null && err !== '') console.log(err);
							message.channel.send('Sauvegarde dans base de données mise à jour');
						}
					);
				} else {
					client.query(
						'insert into counter_msg (id, nickname, nb) values ($1, $2, $3)',
						[ message.author.id, message.author.username.toString(), 1 ],
						(err) => {
							if (err !== null && err !== '') console.log(err);
							message.channel.send('Sauvegarde dans base de données faite');
						}
					);
				}
			}
		);

	}

	const thisWord = 'fart';
	if (message.content.includes(thisWord)) {
		message.delete(1000);
		message.channel.sendMessage('**@&#$%!**');
		for ($i = 0; $i <= 100; $i++) {
			message.author.send('Le mot **FART** est interdit!');
		}
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
