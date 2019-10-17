const fs = require('fs');
const ytdl = require('ytdl-core');

module.exports = {
    name: 'vocal',
    description: 'Un max de barre !',
    execute(message, args) {
        const streamOptions = {seek: 0, volume: 1};
        const voiceChannel = message.member.voiceChannel;
        voiceChannel
            .join()
            .then(connection => {
                console.log("joined channel");
                const stream = ytdl('https://www.youtube.com/watch?v=gOMhN-hfMtY', {filter: 'audioonly'});
                const dispatcher = connection.playStream(stream, streamOptions);
                dispatcher.on("end", end => {
                    console.log("left channel");
                    voiceChannel.leave();
                });
            }).catch(err => console.log(err));
    }
}
