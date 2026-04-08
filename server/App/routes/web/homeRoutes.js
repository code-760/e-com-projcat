let express = require("express");
const { prodectebs,  bannerData, bastsellers, faqviwe } = require("../../controler/web/homecontrolle");
let homeRoutes = express.Router();

homeRoutes.get("/prodecat-tebs", prodectebs);

homeRoutes.get("/banner-data", bannerData);
homeRoutes.get("/bestsellers", bastsellers);
homeRoutes.get("/faq-viwe", faqviwe);

module.exports = homeRoutes;

