let express = require("express");
const { careatewishlist, getWishlist, deletewishlist } = require("../../controler/web/wishlistcontroller");
let WishlistRoutes = express.Router();


WishlistRoutes.post("/add-to-wishlist",careatewishlist);

WishlistRoutes.post("/viwe-Wishlist",getWishlist);
WishlistRoutes.delete("/remove/:productId",deletewishlist);




module.exports = { WishlistRoutes };