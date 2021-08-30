const axios = require('axios');

module.exports = {
    name: 'gitlab',
    description: "Check live",
    execute: function (message, args, bot) {
        axios.get('https://gitlab.example.com/api/v4/projects?access_token=kG8wws6uTFdwh76ciF7G')
            .then(function (response) {
                message.send(response.toString());
            })
        ;
    }
};

