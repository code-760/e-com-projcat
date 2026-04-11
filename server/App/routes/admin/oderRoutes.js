let express = require("express");
const { Oderviwe } = require("../../controler/admin/Odercontoller");
let oderroutes = express.Router();

oderroutes.get('/oder',Oderviwe)


module.exports = oderroutes;