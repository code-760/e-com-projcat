let jwt = require("jsonwebtoken");
const Razorpay = require("razorpay");
const mongoose = require("mongoose");
const { oderModel } = require("../../models/oder.model");
const { cartModel } = require("../../models/cart.model");
let crypto = require("crypto");
const { log } = require("console");

var instance = new Razorpay({
  key_id: "rzp_test_SPPTOU3xnWuDL3",
  key_secret: "iLWbe77IHZOus0638iJ6A2jS",
});

let Odercreate = async (req, res) => {
  try {
    // <-- Yahan try start kiya
    let token = req.headers.authorization.split(" ")[1];
    let decoded = jwt.verify(token, process.env.TOKEN);
    let userid = decoded.UserID;

    let oderobj = { ...req.body };

    if (req.body.paymentMethod === "2") {
      // cash on delivery
      oderobj["userID"] = userid;
      oderobj["paymentStatus"] = "1";
      let oderdata = new oderModel(oderobj);
      await oderdata.save();
      await cartModel.deleteMany({ userId: userid });

      res.send({
        _status: "success",
        message: "oder created successfully",
        OderiD:oderdata.OderiD
      });
    } else {
      oderobj["userID"] = userid;
      let oderdata = new oderModel(oderobj);
      await oderdata.save();

      let rezorpayOrder = {
        amount: oderobj.totalAmount * 100,
        currency: "INR",
        receipt: oderdata._id.toString(),
        
      };

      let fainlrezorpayOrder = await instance.orders.create(rezorpayOrder);

      oderdata.razorpayOrderId = fainlrezorpayOrder.id;
      await oderdata.save();
      
      res.send({
        _status: "success",
        message: "oder created successfully",
        fainlrezorpayOrder,
      });
      // online payment
    }
  } catch (error) {
    // <-- Yahan error pakadne ka logic
    console.log("Order Create Error: ", error);
    res.status(500).send({
      _status: "error",
      message: "Order create karte waqt koi error aayi",
      error: error.message,
    });
  }
};

let verifyPayment = async (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  let decoded = jwt.verify(token, process.env.TOKEN);
  let userid = decoded.UserID;

  let { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

  console.log("Received payment verification request: ", req.body);

  let sign = razorpay_order_id + "|" + razorpay_payment_id;
  let expectedSign = crypto
    .createHmac("sha256", "iLWbe77IHZOus0638iJ6A2jS")
    .update(sign.toString())
    .digest("hex");
  if (expectedSign === razorpay_signature) {
    //payment successful
    await oderModel.updateOne(
      { razorpayOrderId: razorpay_order_id },
      {
        $set: {
          paymentStatus: "2",
          razorpayPayment: razorpay_payment_id,
          orderStatus: "process",
        },
      },
    );
    await cartModel.deleteMany({ userId: userid });
   let oderdata = await oderModel.findOne({ razorpayOrderId: razorpay_order_id }).select("OderiD");
    res.send({ message: "Payment verified successfully", status: true, OderiD: oderdata.OderiD });
  } else {
    //payment failed
    res.send({ message: "Invalid signature", status: false });
  }
};

let viweoder = async (req, res) => {

  let {OderiD} = req.params;
  let oderdata = await oderModel.findOne({ OderiD: OderiD });
  res.send({
    _status: "success",
    path: process.env.PRODUCTIMAGEPATH,
    message: "Oder retrieved successfully",
    data: oderdata,
  });
 
};


module.exports = {
  Odercreate,
  verifyPayment,
  viweoder
};
