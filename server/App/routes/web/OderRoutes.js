let express = require("express");
const { Odercreate, verifyPayment, viweoder } = require("../../controler/web/Odercontrolle");
let OderRoutes = express.Router();

OderRoutes.post(`/create`,Odercreate);
OderRoutes.post(`/verify-payment`,verifyPayment);
OderRoutes.get(`/view/:OderiD`, viweoder);


module.exports = OderRoutes;