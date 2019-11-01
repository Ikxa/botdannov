const {Client} = require('pg');
const moment = require('moment');

module.exports = {
    name: 'mute',
    description: "Mute quelqu'un pour 5 min, ça fait du bien!",
    execute(message, args) {
        if (!message.author.bot) {
            // localStorage with many keys ? Nickname, and timer for 5 min ?
            // Dynamic timer ? In args ?
            const muted_params = [];
            let nickname = args[0];
            let timer = args[1];
            muted_params.push(nickname, timer);
            localStorage.setItem("muted_params", JSON.stringify(muted_params));
        }
    }
};
