module.exports = {
    name: "ls",
    description: "Permet d'enregistrer la dernière heure à laquelle on vous a vu !",
    execute(message) {
        message.channel.send('La dernière fois qu\'on a vu ' + message.author + ', c\'était à ' + (new Date().getHours()) + ':' + (new Date().getMinutes()));
    },
};