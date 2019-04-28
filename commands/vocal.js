const fs = require('fs');
const ytdl = require('ytdl-core');

module.exports = {
	name: 'vocal',
	description: 'Un max de barre !',
	execute(message, args) {
		const playingOptions = { filter: 'audioonly', bitrate: 192000 };
		console.log(args[0]);
		let voiceChannel = message.guild.channels
			.filter(function(channel) {
				return channel.type === 'voice';
			})
			.last();

		voiceChannel
			.join()
			.then((connection) => {
				//const dispatcher = connection.playFile('./sounds/louane.mp3');
				const stream = ytdl(args[0], { filter: 'audioonly' });
				const dispatcher = connection.playStream(stream, playingOptions);

				if (args[0] === 'pause') dispatcher.pause();

				if (args[0] === 'stop') {
					dispatcher.stream.end();
				} else {
					message.channel.send("Arg0 n'est pas stop");
				}

				dispatcher.on('error', (err) => {
					message.channel.send(err);
				});

				dispatcher.on('end', (end) => {
					voiceChannel.leave();
				});
			})
			.catch((e) => {
				console.log(e);
			});
	}
};
