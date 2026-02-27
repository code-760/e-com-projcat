const { ProductModel } = require("../../models/perodect.model");

let prodectebs = async (req, res) => {
  let filter = { Productstatus: true };

  if (req.query.type) {
    filter.ProductType = req.query.type ?? 1 
  }

  let productsata = await ProductModel.find(filter);

  res.send({
    _status: "success",
    path: process.env.PRODUCTIMAGEPATH,
    message: "product data fetch successfully",
    data: productsata,
  });
};

module.exports = {
  prodectebs,
};
