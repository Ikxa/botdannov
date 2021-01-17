const fetch = require("node-fetch");

const url = "https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?locale=fr-FR&country=FR&allowCountries=FR";

module.exports = async () => {
    let ret = [];
    let error;
    try {
        let res = await fetch(url);
        let data = await res.json();
        for (let i = 1; i < data.data.Catalog.searchStore.elements.length; i++) {
            obj = data.data.Catalog.searchStore.elements[i];
            const imageUrl = obj.keyImages.reduce((acc, cur) => {
                if (cur.type === "Thumbnail") {
                    return cur;
                } else {
                    return acc;
                }
            }).url;

            if (obj.promotions !== 'undefined' && obj.promotions !== null) {
                if (obj.promotions.upcomingPromotionalOffers.length == 0) {
                    console.log('je passe ici', obj);
                    console.log('upcomingPromotionalOffers', obj.promotions.upcomingPromotionalOffers.length);
                    const game = {
                        title: obj.title,
                        offerTill: new Date(
                            obj.promotions.promotionalOffers[0].promotionalOffers[0].endDate
                        ),
                        image: imageUrl,
                        productSlug: obj.productSlug,
                    };
                    ret.push(game);
                }
            }
        }
        console.log('ret', ret);
    } catch (e) {
        error = e;
    }

    return {ret, error};
};