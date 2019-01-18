module.exports = {
    name: "debug",
    description: "Vérifier les types",
    execute(message) {
        let member = message.guild.fetchMember('193467165389619211')
        if (member !== null && typeof(member) !== 'undefined') {
            member.send('Bonjour Jordan!');
            console.log(member);
        }
    },
};