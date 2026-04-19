let jwt = require("jsonwebtoken");
const { cartModel } = require("../../models/cart.model");

let Addcart = async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let decoded = jwt.verify(token, process.env.TOKEN);
    let userid = decoded.UserID;

    const { productId, productName, price, productImg, productQuantity } = req.body;

    // YAHAN FIX HAI: Filter mein productId aur userId DONO hone chahiye
    let data = await cartModel.findOneAndUpdate(
      { 
        productId: productId, 
        userId: userid 
      }, 
      {
        $inc: { quantity: Number(productQuantity) || 1 }, 
        $set: { 
          productName: productName, 
          price: price, 
          productImg: productImg,
          userId: userid // Ensure schema field matches (userId small i)
        },
      },
      { upsert: true, new: true } 
    );

    console.log("Cart updated for user:", userid); // Render logs mein check karne ke liye

    res.status(200).send({
      _status: "success",
      message: "Product added to cart successfully",
      // data: data
    });

  } catch (error) {
    console.log("Database Save Error:", error.message);
    res.status(500).send({ _status: "error", message: error.message });
  }
};

let viweCart = async (req, res) => {
  try {
    // 1. Check karein ki Authorization header exist karta hai
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ _status: "error", message: "Authorization header missing hai" });
    }

    // 2. Token extract karein
    let token = authHeader.split(" ")[1];
    
    // 3. Check karein ki token khali ya "null"/"undefined" string toh nahi
    if (!token || token === "undefined" || token === "null") {
      return res.status(401).send({ _status: "error", message: "Token invalid ya missing hai" });
    }

    // 4. Verify karein (Try-Catch ke andar)
    let decoded = jwt.verify(token, process.env.TOKEN);
    let userid = decoded.UserID;

    // 5. Data fetch karein
    let datacart = await cartModel.find({ userId: userid });

    res.send({
      _status: "success",
      path: process.env.PRODUCTIMAGEPATH, // Check karein ye .env mein sahi hai
      message: "Cart retrieved successfully",
      // data: datacart
    });

  } catch (error) {
    console.error("JWT Error:", error.message);
    
    // Agar token expire ho gaya ya malformed hai toh yahan catch hoga
    res.status(403).send({ 
      _status: "error", 
      message: error.message === "jwt malformed" ? "Token galat format mein hai" : "Authentication failed" 
    });
  }
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
