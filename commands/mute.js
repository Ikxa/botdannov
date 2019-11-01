const {Client} = require('pg');
const moment = require('moment');

module.exports = {
    name: 'mute',
    description: "Mute quelqu'un pour 5 min, ça fait du bien!",
    execute(message, args) {
        if (!message.author.bot) {
            /* Storage */
            let Storage = require('dom-storage');
            let sessionStorage = new Storage(null, { strict: true });
            let values = { nickname: args[0], timer: args[1] };
            sessionStorage.setItem('values', JSON.stringify(values));
        }
    }
};
