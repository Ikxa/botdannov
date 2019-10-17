const fs = require('fs');
const ytdl = require('ytdl-core');

module.exports = {
	name        : 'vocal',
	description : 'Un max de barre !',
	execute(message, args) {
		const playingOptions = { filter: 'audioonly', bitrate: 192000 };

		let voiceChannel = message.guild.channels
			.filter(function(channel) {
				return channel.type === 'voice';
			})
			.last();

		if (message.member.voice.channel) {
			const connection = message.member.voice.channel.join();
		} else {
			message.reply('You need to join a voice channel first!');
		}

		/*voiceChannel
			.join()
			.then((connection) => {
				const stream = ytdl(args[0], { filter: 'audioonly' });
				const dispatcher = connection.playStream(stream, playingOptions);

				dispatcher.on('error', (err) => {
					message.channel.send(err);
				});

				dispatcher.on('end', (end) => {
					voiceChannel.leave();
				});
			})
			.catch((e) => {
				console.log(e);
			});*/
	}
};
