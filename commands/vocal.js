const fs = require('fs');
const ytdl = require('ytdl-core');

module.exports = {
    name: 'vocal',
    description: 'Un max de barre !',
    execute(message, args) {
        const playingOptions = {filter: 'audioonly', bitrate: 192000};

        console.log(args[0]);

        let voiceChannel = message.member.voiceChannel;
        let connection = voiceChannel.join();

        const dispatcher = connection.playStream(ytdl(args[0], {filter: 'audioonly'}), playingOptions);

        dispatcher.on('error', (err) => {
            message.channel.send(err);
        });

        dispatcher.on('end', (end) => {
            voiceChannel.leave();
        });

        /*voiceChannel
            .join()
            .then((connection) => {
                console.log("Je commence !!");



                console.log("J'ai fini, je quitte !");
            })
            .catch((e) => {
                console.log(e);
            });*/
    }
};
