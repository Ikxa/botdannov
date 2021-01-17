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

            if (obj.promotions != undefined) {
                console.log(obj.title + ' has promotions');
                if (obj.promotions.upcomingPromotionalOffers.length != 0) {
                    console.log([
                        obj.promotions.upcomingPromotionalOffers,
                        obj.promotions.upcomingPromotionalOffers.promotionalOffers[0],
                        obj.promotions.upcomingPromotionalOffers.promotionalOffers
                    ]);
                    const game = {
                        title: obj.title,
                        offerTill: new Date(
                            obj.promotions.upcomingPromotionalOffers.promotionalOffers[0].endDate
                        ),
                        image: imageUrl,
                        productSlug: obj.productSlug,
                    };
                    ret.push(game);
                }
            }
        }
    } catch (e) {
        error = e;
    }

    return {ret, error};
};