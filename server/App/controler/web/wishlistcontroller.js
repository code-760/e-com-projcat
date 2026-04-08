let jwt = require("jsonwebtoken");
const { wishlistModel } = require("../../models/wishlist.model");

let careatewishlist = async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let decoded = jwt.verify(token, process.env.TOKEN);
    let userid = decoded.UserID;

    let productId = req.body.productId; // Frontend se aayi product id

    // User ki wishlist dhoondo
    let wishlist = await wishlistModel.findOne({ userId: userid });

    if (wishlist) {
      // ARRAY LOGIC: Check karo ki product pehle se Array me hai ya nahi
      let alreadyExists = await wishlistModel.findOne({
        userId: userid,
        products: productId, // Ye check karega ki products array me ye id hai ya nahi
      });

      if (alreadyExists) {
        return res.status(200).send({
          status: 0,
          msg: "Ye product pehle se wishlist me maujood hai!",
        });
      } else {
        // Agar array me nahi hai, toh array me daal do (push kardo)
        wishlist.products.push(productId);
        let newProduct = await wishlist.save();

        return res.status(200).send({
          status: 1,
          msg: "Product wishlist me add ho gaya!",
          newProduct,
        });
      }
    } else {
      // Nayi wishlist banate waqt bhi array [] ka use karo
      let newWishlist = new wishlistModel({
        userId: userid,
        products: [productId], // Array format
      });
      await newWishlist.save();

      return res.status(200).send({
        status: 1,
        msg: "Nayi wishlist ban gayi aur product add ho gaya!",
        newWishlist,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({ status: 0, msg: "Token Invalid ya Server Error" });
  }
};

let getWishlist = async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let decoded = jwt.verify(token, process.env.TOKEN);
    let userid = decoded.UserID;

    // Find the user's wishlist and populate the product details
    const wishlistData = await wishlistModel
      .findOne({ userId: userid })
      .populate("products");

    if (!wishlistData || wishlistData.products.length === 0) {
      return res.status(200).send({
        status: 1,
        msg: "Aapki wishlist abhi khaali hai.",
        data: [],
      });
    }

    res.status(200).send({
      status: 1,
      msg: "Wishlist data safaltapoorvak praapt hua!",
      path: process.env.PRODUCTIMAGEPATH,
      data: wishlistData.products,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({ status: 0, msg: "Token Invalid ya Server Error" });
  }
};


let deletewishlist = async (req, res) => {
  try {
    let { productId } = req.params; // Product ID to remove
    let token = req.headers.authorization.split(" ")[1];
    let decoded = jwt.verify(token, process.env.TOKEN);
    let userid = decoded.UserID;

    // Use $pull to remove the specific productId from the products array
    await wishlistModel.updateOne({ userId: userid }, { $pull: { products: productId } });

    res.status(200).send({
      status: 1,
      msg: "Product wishlist se hata diya gaya hai.",
    });
  } catch (error) {
    res.status(500).send({ status: 0, msg: "Server Error" });
  }
};



module.exports = { careatewishlist, getWishlist,deletewishlist };
