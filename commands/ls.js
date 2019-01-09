module.exports = {
    name: "ls",
    description: "Permet d'enregistrer la dernière heure à laquelle on vous a vu !",
    execute(message) {
        let options = {
            timeZone: 'Europe/Paris',
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
        },
        formatter = new Intl.DateTimeFormat([], options);
        formatter.format(new Date());

        message.channel.send(formatter.toString());
    },
};