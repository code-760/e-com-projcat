let mongoose = require("mongoose");
let WishlistSchema = mongoose.Schema({
 products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  }],
 userId:String,
});

let wishlistModel = mongoose.model("wishlist", WishlistSchema);

module.exports =  {wishlistModel}