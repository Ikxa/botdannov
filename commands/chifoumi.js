module.exports = {
    name: "chifoumi",
    description: ".chifoumi choix - une partie de chifoumi avec le bot ?",
    execute(message, args) {
        let userChoice = args.join(" ").toUpperCase();
        let computerChoice = Math.floor((Math.random() * 3) + 1);
        switch (computerChoice) {
            case 1:
                // Pierre
                if (userChoice === 'PIERRE') {
                    message.channel.send('Égalité poulet, j\'ai choisi pierre !');
                } else if (userChoice === 'CISEAUX') {
                    message.channel.send('Tu perds, j\'ai choisi pierre !');
                } else if (userChoice === 'FEUILLE') {
                    message.channel.send('Tu gagnes, j\'ai choisi pierre !');
                }
            break;
            case 2:
                // Feuille
                if (userChoice === 'FEUILLE') {
                    message.channel.send('Égalité poulet, j\'ai choisi feuille !');
                } else if (userChoice === 'CISEAUX') {
                    message.channel.send('Tu gagnes, j\'ai choisi feuille !');
                } else if (userChoice === 'PIERRE') {
                    message.channel.send('Tu perds, j\'ai choisi feuille !');
                }
            break;
            case 3:
                // Ciseaux
                if (userChoice === 'CISEAUX') {
                    message.channel.send('Égalité poulet, j\'ai choisi ciseaux !');
                } else if (userChoice === 'FEUILLE') {
                    message.channel.send('Tu perds, j\'ai choisi ciseaux !');
                } else if (userChoice === 'PIERRE') {
                    message.channel.send('Tu gagnes, j\'ai choisi ciseaux !');
                }
            break;
        }
    },
};