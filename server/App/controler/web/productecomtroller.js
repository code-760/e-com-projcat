const { ProductModel } = require("../../models/perodect.model");

let producteditela = async (req, res) => {
  let { id } = req.params;
  let diteleddata = await ProductModel.findOne({ _id: id })
    .populate("color", "colorName")
    .populate("material", "materialName")
    .populate("Category", "categoryName")
  res.send({
    _status: "success",
    _massage: "product data fetch successfully",
    path: process.env.PRODUCTIMAGEPATH,
    data: diteleddata,
  });
};
module.exports = {
  producteditela,
};
