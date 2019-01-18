module.exports = {
    name: "debug",
    description: "Vérifier les types",
    execute(message) {
        console.log(message.member);
        let member = message.guild.fetchMember('193467165389619211')
        if (member !== null && typeof(member) !== 'undefined') {
            message.channel.send('Bonjour Jordan!');
            console.log(member);
        } else {
            message.channel.send('Bfezhufzugrze');
        }
    },
};