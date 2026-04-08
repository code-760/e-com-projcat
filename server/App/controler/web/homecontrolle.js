const { Faqmodele } = require("../../models/Faq.model");
const { ProductModel } = require("../../models/perodect.model");
const { SlidersModel } = require("../../models/Sliders.Model");

let prodectebs = async (req, res) => {
  let filter = { Productstatus: true };

  if (req.query.type) {
    filter.ProductType = req.query.type ?? 1;
  }

  let productsata = await ProductModel.find(filter);

  res.send({
    _status: "success",
    path: process.env.PRODUCTIMAGEPATH,
    message: "product data fetch successfully",
    data: productsata,
  });
};
// Database fetch function (Isme res.send nahi chalega)
let bannerData = async (req, res) => {
  try {
    let bannerdata = await SlidersModel.find({
      isdeleted: false,
      Slidersstatus: true,
    });

    // Seedha data return karein
    res.send({
      _status: "success",
      message: "banner data fetch successfully",
      path: process.env.SLIDERIMAGEPATH,
      data: bannerdata,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res
      .status(500)
      .send({ _status: "error", message: "Failed to fetch banner data" });
  }
};

let bastsellers = async (req, res) => {
  let filter = { Productstatus: true };

  if (req.query.type) {
    filter.ProductType = req.query.type ?? 1;
  }

  let productsata = await ProductModel.find(filter)
    .sort({ salesCount: -1 })
    .limit(10); // Top 10 bestsellers

  res.send({
    _status: "success",
    message: "bestseller product data fetch successfully",
    bpath: process.env.PRODUCTIMAGEPATH,
    productsata,
  });
};

let faqviwe = async (req, res) => {
  let faqdata = await Faqmodele.find({
    isdeleted: false,
    Faqstatus: true,
  });

  res.send({
    _status: "success",
    message: "faq data fetch successfully",
    data: faqdata,
  }); 
};

module.exports = {
  prodectebs,
  bannerData,
  bastsellers,
  faqviwe
};
