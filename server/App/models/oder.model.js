let mongoose = require("mongoose");
let oderSchema = mongoose.Schema({
  OderItem: [],
  OderiD: { type: String },
  shippingAddess: { type: Object },
  paymentMethod: {
    type: String,
    enum: ["1", "2"],
    default: "1",
  },
  paymentStatus: {
    type: String,
    enum: ["1", "2", "3"],
    default: "1", // Quotes lagayein
  },
  razorpayOrderId: { type: String },
  razorpayPayment: { type: String },
  orderAmount: { type: Number },
  orderQty: { type: Number },
  shippingCharges: { type: Number },
  orderStatus: {
    type: String,
    enum: ["pending", "process", "completed"],
    default: "pending",
  },
  // Ise Cart ke saath match karne ke liye 'userId' (small) karein
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

let oderModel = mongoose.model("oder", oderSchema);

module.exports = { oderModel };
