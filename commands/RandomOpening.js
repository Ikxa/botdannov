module.exports = {
    name: 'Rdopen',
    description: "Ouverture d'échecs random",
    execute(message, args) {
      var facts = ["Anderssen's Opening","Ware Opening","Sodium Attack","Sokolsky Opening","Saragossa Opening","Van Geet Opening","Van 't Kruijs Opening","Mieses Opening","Barnes Opening","Benko's Opening","Grob's Attack","Clemenz Opening","Desprez Opening","Amar Opening","Larsen's Opening","Bird's Opening","Réti Opening","English Opening","Queen's Pawn Game","Old Benoni Defence","Queen's Indian Defence","Budapest Gambit declined","Old Indian Defence","Benko Gambit","Dutch Defence","Sicilian Defence","Nimzowitsch Defence","Scandinavian Defence","Alekhine's Defence","Pirc Defence","Austrian attack","Caro-Kann Defence","Center Game","Bishop's Opening","Vienna Game","King's Gambit","Philidor Defence","Scotch Game","Evans Gambit","Giuoco Piano","Two Knights Defence","Ruy Lopez","Queen's Gambit Accepted","Semi-Slav Defence","Lasker Defence","Neo-Grünfeld Defence","Grünfeld Defence","Bogo-Indian Defence","Queen's Indian Defence","King's Indian Defence"];
var fact = Math.floor(Math.random() * facts.length);
message.channel.send(facts[fact]);
  }
};
