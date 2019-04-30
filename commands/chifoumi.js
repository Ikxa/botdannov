const { Client } = require('pg');

module.exports = {
	name        : 'chifoumi',
	description : '!chifoumi choix - une partie de chifoumi avec le bot ?',
	execute(message, args) {
		const client = new Client({
			connectionString : process.env.DATABASE_URL,
			ssl              : true
		});
		let userChoice = args.join(' ').toUpperCase();
		let computerChoice = Math.floor(Math.random() * 3 + 1);
		let win = false;
		let draw = false;
		let resultChif = 0;
		let computer = 0;
		switch (computerChoice) {
			case 1:
				// Pierre
				if (userChoice === 'PIERRE') {
					draw = true;
					message.channel.send('Égalité');
				} else if (userChoice === 'CISEAUX') {
					win = false;
					message.channel.send('Perdu !');
				} else if (userChoice === 'FEUILLE') {
					win = true;
					message.channel.send('Gagné !');
				}
				break;
			case 2:
				// Feuille
				if (userChoice === 'FEUILLE') {
					draw = true;
					message.channel.send('Égalité');
				} else if (userChoice === 'CISEAUX') {
					win = true;
					message.channel.send('Gagné !');
				} else if (userChoice === 'PIERRE') {
					win = false;
					message.channel.send('Perdu !');
				}
				break;
			case 3:
				// Ciseaux
				if (userChoice === 'CISEAUX') {
					draw = true;
					message.channel.send('Égalité');
				} else if (userChoice === 'FEUILLE') {
					win = false;
					message.channel.send('Perdu !');
				} else if (userChoice === 'PIERRE') {
					win = true;
					message.channel.send('Gagné !');
				}
				break;
		}

		if (win === true && draw === false) {
			resultChif = 1;
			computer = 0;
		} else if (win === false && draw === true) {
			resultChif = 1;
			computer = 1;
		} else if (win === false && draw === false) {
			resultChif = 0;
			computer = 1;
		}

		client.connect((err, client) => {
			client.query(
				'select id, scoreUser, scoreComputer from chifoumi \
                where id = $1',
				[ message.author.id ],
				(err, result) => {
					if (err !== null && err !== '') console.log(err);
					const rows = result.rows;
					console.log(typeof rows[0]);
					if (typeof rows[0] !== 'undefined') {
						console.log(Object.entries(rows[0])[1]);
						/*console.log(rows[0]);
						console.log(rows[0]['']['scoreUser']);
						console.log(rows['scoreUser']);*/

						// Score existant > Update + message pour afficher les scores
						client.query(
							'update chifoumi set scoreUser = $1, scoreComputer = $2 where id = $3',
							[ resultChif, computer, message.author.id ],
							(err) => {
								if (err !== null && err !== '') console.log(err);
								message.channel.send(
									message.author.username +
										' - ' +
										rows['scoreUser'] +
										' : ' +
										rows['scoreComputer'] +
										' - Ordinateur'
								);
							}
						);
					} /*else {
						// Score inexistant > Insert + message pour afficher les scores
						client.query(
							'insert into chifoumi (id, nickname, scoreUser, scoreComputer) values ($1, $2, $3, $4)',
							[ message.author.id, message.author.username, resultChif, computer ],
							(err) => {
								if (err !== null && err !== '') console.log(err);
								message.channel.send(
									message.author.username + ' - ' + resultChif + ':' + computer + ' - Ordinateur'
								);
							}
						);
					}*/
				}
			);
		});
	}
};
