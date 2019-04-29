export const name = 'stop';
export const description = 'Stopper la musique !';
export function execute(message, args) {
	message.guild.me.voiceChannel.leave();
	message.channel.send("J'ai dead ça!");
}
