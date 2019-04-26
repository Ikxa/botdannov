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

			voiceChannel
				.join()
				.then(function(connection) {
					fs.readdir('../sounds/', function(err, items) {
						for (let i = 0; i < items.length; i++) {
							const dispatcher = connection.playFile('../sounds/' + items[i]);
						}
					});
				})
				.catch(console.error);
		} else {
			message.send('CA MARCHE PAS!');
		}
	}
};
