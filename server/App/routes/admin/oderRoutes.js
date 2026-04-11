const express = require("express");
const { OrderView } = require("../../controller/admin/orderController");

const orderRoutes = express.Router();

orderRoutes.get('/order', OrderView);

module.exports = {orderRoutes};