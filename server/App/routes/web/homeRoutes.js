let express = require("express");
const { prodectebs,  bannerData, bastsellers, faqviwe, magamanu, megamenu } = require("../../controler/web/homecontrolle");
let homeRoutes = express.Router();

homeRoutes.get("/prodecat-tebs", prodectebs);

homeRoutes.get("/banner-data", bannerData);
homeRoutes.get("/bestsellers", bastsellers);
homeRoutes.get("/faq-viwe", faqviwe);
homeRoutes.get("/mega-manu", megamenu);

module.exports = homeRoutes;

