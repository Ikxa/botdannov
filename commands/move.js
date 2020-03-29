module.exports = {
    name: 'mv',
    description: "Rediriger les images et les liens",
    execute(message, args) {
        if (message.attachments.size > 0 && message.channel.id != '525134186504519680') {
            message.attachments.forEach(attachment => {
                const url = attachment.url;
                bot.channels.get('525134186504519680').send('', {file: url});
                bot.channels.get('525134186504519680').send("<@" + message.author.id + ">, je déplace la photo ici.");
            });
            message.delete();
        }

        let regx = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        let cdu = regx.test(message.content.toLowerCase());

        if (cdu === true && message.channel.id != '680739479862247429') {
            if (!message.content.startsWith('https://tenor.com')) {
                bot.channels.get('680739479862247429').send("<@" + message.author.id + ">, je déplace le lien ici.");
                bot.channels.get('680739479862247429').send(message.content);
                message.delete();
            }
        }
    }
};

