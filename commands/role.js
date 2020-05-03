module.exports = {
    name: 'role',
    description: "Créer un rôle",
    execute(message, args, bot) {

        console.log(message.guild.roles);

        message.roles.create({
            data: {
                name: "Super Cool Role",
                color: "RANDOM",
            },
            reason: 'On aime les gens coolos !',
        }).catch((error) => {
            console.log(error);
        });
    }
};

