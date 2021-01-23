const twitchAPI = require('twitch-api-v5');

module.exports = {
    name: 'twitch',
    description: "Check live",
    execute: function (message, args, bot) {
        twitchAPI.clientID = 'ykzb2tmxxwwd4nhu4ijdst4hwutpkd';
        const users = twitchAPI.users.usersByName({users: 'eidoriaan'}, error => ({}));

        console.log(users);
    }
};

