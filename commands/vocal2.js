const fs = require('fs');

module.exports = {
	name        : 'vocal',
	description : 'Un max de barre !',
	execute(message, args) {
		const contentFolder = fs.readdir('./sounds');
		var contentFolderName = [];
		contentFolder.forEach((file) => {
			const soundName = file.substring(0, file.length - 4);
			contentFolderName = contentFolderName.push(soundName);
		});

		message.channel.send(contentFolderName);

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
