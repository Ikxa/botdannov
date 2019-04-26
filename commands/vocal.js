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
			if (args[0] === 'pause') dispatcher.pause();
			if (args[0] === 'resume') dispatcher.resume();
			dispatcher.on('end', (end) => {
				voiceChannel.leave();
			});
		});
	}
};
