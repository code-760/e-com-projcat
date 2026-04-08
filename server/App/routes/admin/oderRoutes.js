let express = require("express");
const { Oderviwe } = require("../../controler/admin/Odercontoller");
let oderRoutes = express.Router();

oderRoutes.get('/oder',Oderviwe)


module.exports = oderRoutes;