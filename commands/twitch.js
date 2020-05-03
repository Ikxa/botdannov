const axios = require('axios');

module.exports = {
    name: 'twitch',
    description: "Savoir si un stream est en ligne",
    execute(message, args, bot) {

        /*const role = <guild>.roles.cache.find(role => role.name === '<role name>');
        const member = <message>.mentions.members.first();
        member.roles.add(role);*/

        axios.get('https://api.twitch.tv/helix/users', {
            params: {
                login: args[0],
                "Client-ID": "ykzb2tmxxwwd4nhu4ijdst4hwutpkd",
            }
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

    }
};

