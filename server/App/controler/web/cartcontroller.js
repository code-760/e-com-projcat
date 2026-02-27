let jwt = require("jsonwebtoken");
const { cartModel } = require("../../models/cart.model");
let Addcart = async (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  let decoded = jwt.verify(token, process.env.TOKEN);
  let userid = decoded.UserID;

  let obj = { ...req.body, user: userid };

  console.log(`Received cart data:`, obj);

 let data = await cartModel.findOneAndUpdate(
    { productId: obj.productId }, // 1. Filter (Dhoondo)
    {
      $inc: { quantity: Number(obj.productQuantity) }, // 2. Update ($inc se plus hoga)
      $set: { productName: obj.productName, price: obj.price, productImg: obj.productImg, userId: userid }, // 3. Set (Baaki fields bhi update kar do)
    },
    { upsert: true }, // 4. Option (Nahi mila toh insert kar do)
  );
  res.send({
    _status: "success",
    message: "Product added to cart successfully",
    data: data
  });
};

let viweCart = async (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  let decoded = jwt.verify(token, process.env.TOKEN);
  let userid = decoded.UserID;
  let datacart = await cartModel.find({ userId: userid });
  res.send({
    _status: "success",
    path: process.env.PRODUCTIMAGEPATH,
    message: "Cart retrieved successfully",
    data: datacart
  });
};


let deleteCart =async (req, res) => {
  
    let {id}=req.params;

 
  let cartData = await cartModel.deleteOne({_id:id})
    res.send({  
    _status: true,
    _message: "Cart Item deleted successfully",
    
    })
};

let QutantityUpdate = async (req, res) => {
  let {id ,quantity}=req.body;
  let cartData = await cartModel.updateOne({_id:id},{$set:{quantity:quantity}})
    res.send({  
    _status: true,
    _message: "Cart Item Quantity updated successfully",
      
    })
} 

module.exports = {
  Addcart,
  viweCart,
  deleteCart,
  QutantityUpdate
};
