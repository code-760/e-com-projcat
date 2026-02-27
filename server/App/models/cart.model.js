let mongoose = require("mongoose");
let CartSchema = mongoose.Schema({
  productName: String,
  productId: String,
  price: Number,
  productImg: String,
  quantity: Number,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

let cartModel = mongoose.model("cart", CartSchema);

module.exports = { cartModel };
