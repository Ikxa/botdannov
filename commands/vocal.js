const fs = require('fs');

module.exports = {
	name        : 'vocal',
	description : 'Un max de barre !',
	execute(message, args) {
		let voiceChannel = message.guild.channels
			.filter(function(channel) {
				return channel.type === 'voice';
			})
			.last();

		voiceChannel.join().then((connection) => {
			const dispatcher = connection.playFile('./sounds/louane.mp3');
			switch (args[0]) {
				case 'pause':
					dispatcher.pause();
					break;
				case 'resume':
					dispatcher.resume();
					break;
				case 'fuckoff':
					dispatcher.on('end', (end) => {
						voiceChannel.leave();
					});
					break;
			}
		});
	}
};
