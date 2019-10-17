module.exports = {
	name        : 'stop',
	description : 'Stopper la musique !',
	execute(message, args) {
		message.guild.me.voiceChannel.leave();
		message.channel.send("J'ai dead ça chacal !");
	}
};
