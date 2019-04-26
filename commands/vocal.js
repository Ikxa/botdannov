const fs = require('fs');

module.exports = {
	name        : 'vocal',
	description : 'Un max de barre !',
	execute(message, args) {
		if (message.content == '!vocal') {
			let voiceChannel = message.guild.channels
				.filter(function(channel) {
					return channel.type === 'voice';
				})
				.last();

			voiceChannel
				.join()
				.then((connection) => {
					const dispatcher = connection.playFile('./sounds/louane.mp3');
					dispatcher.pause();

					dispatcher.on('end', (end) => {
						voiceChannel.leave();
					});
				})
				.catch(console.error);
		} else {
			message.channel.send('CA MARCHE PAS!');
		}
	}
};
