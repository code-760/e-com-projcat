let express = require("express");
const { Addcart, viweCart, deleteCart, QutantityUpdate } = require("../../controler/web/cartcontroller");

let CartRoutes = express.Router();

CartRoutes.post("/add-to-cart", Addcart);
CartRoutes.post("/view-cart", viweCart);
CartRoutes.delete("/delete-cart/:id", deleteCart);
CartRoutes.put("/update-quantity", QutantityUpdate);



module.exports = { CartRoutes };