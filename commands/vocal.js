const Discord = require('discord.js');

module.exports = {
	name        : 'vocal',
	description : 'Un max de barre !',
	execute() {
		var isReady = true;
		if (isReady && message.content === 'vocal') {
			isReady = false;
			var voiceChannel = message.member.voiceChannel;
			voiceChannel
				.join()
				.then((connection) => {
					const dispatcher = connection.playFile('../sounds/lacoupe.mp3');
					dispatcher.on('end', (end) => voiceChannel.leave());
				})
				.catch((err) => message.send(err));
		}
	}
};
