const Binance = require('node-binance-api');
const binance = new Binance().options({
    APIKEY: process.env.API,
    APISECRET: process.env.SECRET,
});

module.exports = {
    name: 'cryptos',
    description: "Update des cryptos sur 24h",
    execute(message, args, bot) {
        let cryptos = ["TRXBTC", "ETHBTC", "BATBTC", "BTCUSDT"];
        cryptos.forEach(function (item) {
            binance.prevDay(item, (error, prevDay, symbol) => {
                if (prevDay.priceChangePercent > 7 || prevDay.priceChangePercent < -7) {
                    bot.channels.find("name","les-cryptos").send(item + " depuis hier: " + prevDay.priceChangePercent + "%")
                }
            });
        });
    }
};
