module.exports = {
    name: "ls",
    description: "Permet d'enregistrer la dernière heure à laquelle on vous a vu !",
    execute(message) {
        let date = new Date();
        message.channel.send('' + date.getUTCHours());
        message.channel.send('La dernière fois qu\'on a vu ' + message.author + ', c\'était à ' + date.getHours() + 'h' + (new Date().getMinutes()));
    },
};