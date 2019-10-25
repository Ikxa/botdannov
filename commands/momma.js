const axios = require('axios');

module.exports = {
    name: 'demute',
    description: "Demute tout le monde!",
    execute(message, args) {
        axios.get('https://yomomma.info/')
            .then(function (response) {
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }
};
