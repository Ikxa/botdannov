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
            });

        voiceChannel
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
            });
    }
};