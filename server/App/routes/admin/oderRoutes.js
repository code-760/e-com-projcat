const express = require("express");
const { Oderviwe } = require("../../controler/admin/Odercontoller");


const orderRoutes = express.Router();

orderRoutes.get('/order',Oderviwe );

module.exports = {orderRoutes};