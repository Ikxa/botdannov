const axios = require('axios');

module.exports = {
    name: 'momma',
    description: "Ta mère est tellement... ",
    execute(message, args) {
        console.log("J'essaie de récupérer la blague!");
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
