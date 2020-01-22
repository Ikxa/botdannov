module.exports = {
    name: 'RandomOpenings',
    description: "Ouverture d'échecs random",
    execute(message, args) {
      var facts = ["Jordan sort son fou et Adrien gagne en 5 coups","Jordan fait autre chose","test3","test4","test 5"];
var fact = Math.floor(Math.random() * facts.length);
message.channel.send(facts[fact]);
  }
};
