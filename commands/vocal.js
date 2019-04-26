const fs = require('fs');

module.exports = {
	name        : 'vocal',
	description : 'Un max de barre !',
	execute(message) {
		if (message.content == '.vocal') {
			let voiceChannel = message.guild.channels
				.filter(function(channel) {
					return channel.type === 'voice';
				})
				.last();

			/** !! Cannot read property of undefined ! **/
			voiceChannel
				.join()
				.then((connection) => {
					const dispatcher = connection.playFile('./sounds/lacoupe.mp3');
				})
				.catch(console.error);
		} else {
			message.send('CA MARCHE PAS!');
		}
	}
};
