const fs = require('fs');
const ytdl = require('ytdl-core');

module.exports = {
	name: 'vocal',
	description: 'Un max de barre !',
	execute(message, args) {
		message.guild.me.voiceChannel.leave();
		message.channel.send("Je m'en vais!");
	}
};
