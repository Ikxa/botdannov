module.exports = {
    name: "r",
    description: "Random guy in the server",
    execute(message, args) {
        const channels = message.guild.channels.filter(c => c.parentID === '504272478537908225' && c.type === 'voice');

        for (const [channelID, channel] of channels) {

            console.log("channelID:" + channelID);
            console.log("channel:" + channel);

            /*for (const [memberID, member] of channel.members) {
                member.setVoiceChannel('497910775512563742')
                    .then(() => console.log(`Moved ${member.user.tag}.`))
                    .catch(console.error);
            }*/
        }
    },
};