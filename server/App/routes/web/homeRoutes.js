let express = require("express");
const { prodectebs } = require("../../controler/web/homecontrolle");
let homeRoutes = express.Router();

homeRoutes.get("/prodecat-tebs", prodectebs);

module.exports = homeRoutes;

