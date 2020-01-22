module.exports = {
    name: 'RandomOpenings',
    description: "Ouverture d'échecs random",
    execute(message, args) {
      if (message.includes ("Ouverture Random")) {
      var facts = ["Première ouverture","deuxieme ouverture"];
var fact = Math.floor(Math.random() * facts.length);
message.channel.send(facts[fact]);
    }
  }
};
