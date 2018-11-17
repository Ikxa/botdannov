const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
    console.log(`BotDanNov a démarré, avec ${client.users.size} utilisateurs, dans ${client.channels.size} channels de ${client.guilds.size} guildes.`);
    client.user.setActivity('pas le serveur de Justin parce qu\'il pue sa mère', { type: 'WATCHING' });
});

client.on("message", async message => {
    if (message.content == "Bonjour") {
        message.channel.send("Salut " + message.author + ", comment ça va ?");
    }

    if (message.author.bot) return;

    if (message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === "ping") {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! La latence est de ${m.createdTimestamp - message.createdTimestamp}ms. La latence de l'API est de ${Math.round(client.ping)}ms`);
    }

    if (command === "say") { 
        const sayMessage = args.join(" ");
        message.delete().catch(O_o => { });
        message.channel.send(sayMessage);
    }

    if (command === "kick") {
        if (!message.member.roles.some(r => ["Administrator", "Moderator"].includes(r.name)))
            return message.reply("T'as cru t'étais le chef ?! Mange tes morts !");

        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member)
            return message.reply("Merci de mentionner un membre existant du serveur");
        if (!member.kickable)
            return message.reply("Je ne peux pas kick cet utilisateur! Est-ce que c'est le boss?");

        let reason = args.slice(1).join(' ');
        if (!reason) reason = "Sans raisons explicites";

        await member.kick(reason)
            .catch(error => message.reply(`Désolé ${message.author}, je ne peux pas kick ce membre car : ${error}`));
        message.reply(`${member.user.tag} a été kick par ${message.author.tag} car: ${reason}`);
    }

    if (command === "ban") {
        if (!message.member.roles.some(r => ["Administrator"].includes(r.name)))
            return message.reply("Désolé, vous n'avez pas les permissions nécessaires!");

        let member = message.mentions.members.first();
        if (!member)
            return message.reply("Merci de mentionner un membre existant du serveur");
        if (!member.bannable)
            return message.reply("Je ne peux pas ban cet utilisateur! Est-ce que c'est le boss?");

        let reason = args.slice(1).join(' ');
        if (!reason) reason = "Sans raisons explicites";

        await member.ban(reason)
            .catch(error => message.reply(`Désolé ${message.author}, je n'ai pas pu ban cet utilisateur car : ${error}`));
        message.reply(`${member.user.tag} a été ban par ${message.author.tag} car: ${reason}`);
    }

    if (command === "purge") {
        const deleteCount = parseInt(args[0], 10);

        if (!deleteCount || deleteCount < 0 || deleteCount > 10)
            return message.reply("Merci d'indiquer le nombre de messages entre 1 et 10 à supprimer");

        const fetched = await message.channel.fetchMessages({ limit: deleteCount });
        message.channel.bulkDelete(fetched)
            .catch(error => message.reply(`Je n'ai pas pu supprimer les messages car : ${error}`));
    }

    if (command === "dm") {
        let user = message.mentions.users.first();
        const dmMessage = args.join(" ");
        user.send(dmMessage);
        message.delete().catch(O_o => { });
    }
    
    if (command === "chifoumi") {
        const Userchoice = args.join(" ");
        let UserchoiceUpp = Userchoice.toUpperCase();
        let IAChoice = Math.floor((Math.random() * 3) + 1);
        // 1 = Pierre
        // 2 = Feuille 
        // 3 = Ciseaux
        switch (IAChoice) {
            case 1:
                if (UserchoiceUpp == "FEUILLE")
                    message.channel.send("J'ai choisi **pierre**, tu gagnes !");
                else if (UserchoiceUpp == "PIERRE") 
                    message.channel.send("J'ai choisi **pierre** aussi, égalité mon chou !");
                else 
                    message.channel.send("J'ai choisi **pierre**, tu perds !");
                break;
            case 2:
                if (UserchoiceUpp == "CISEAUX")
                    message.channel.send("J'ai choisi **feuille**, tu gagnes !");
                if (UserchoiceUpp == "FEUILLE")
                    message.channel.send("J'ai choisi **feuille** aussi, égalité poulette !");
                else 
                    message.channel.send("J'ai choisi **feuille**, tu perds !");
                break;
            case 3:
                if (UserchoiceUpp == "PIERRE")
                    message.channel.send("J'ai choisi **ciseaux**, tu gagnes !");
                if (UserchoiceUpp == "CISEAUX")
                    message.channel.send("J'ai choisi **ciseaux** aussi, tout est à refaire !");
                else
                    message.channel.send("J'ai choisi **ciseaux**, tu perds !");
                break;
        }
    }
    
    if (command === "help") {
        message.channel.send('Yo @everyone, \n\n Voici les commandes disponibles : \n\n **!ping** - Commande inutile \n **!dm @someone myMessage** - Commande pour demander des nudes \n **!say** - Commande sympa \n **!kick** - Voyez avec le chef, Swytax \n **!ban** - Voyez avec le chef, Swytax \n **!purge** - Commande cool \n\n Voici les emotes : \n\n **!huh** - Tête marrante \n **!ap** - Au plaisir chef \n **!yessay** - Yessay bonhomme \n **!giclette** - Ce sont des choses qui arrivent \n **!spr** - Suprise !');
    }

    switch (command) {
        case 'huh':
            message.channel.send('', {
                files: [
                    "./emotes/huh.png"
                ]
            });
            break;

        case 'ap':
            message.channel.send('', {
                files: [
                    "./emotes/auplaisir.png"
                ]
            });
            break;

        case 'yessay':
            message.channel.send('', {
                files: [
                    "./emotes/yessay.png"
                ]
            });
            break;

        case 'giclette':
            message.channel.send('', {
                files: [
                    "./emotes/giclette.png"
                ]
            });
            break;
            
        case 'spr':
            message.channel.send('', {
                files: [
                    "./emotes/surprised.png"
                ]
            });
            break;

        case 'shrug':
            message.channel.send('¯ _ (ツ) _ / ¯');
            break;
    }
});

client.login(process.env.TOKEN);
