const { categoryModel } = require("../../models/Category.model");
const { colorModel } = require("../../models/color.model");
const { materialModel } = require("../../models/material.model");
const { ProductModel } = require("../../models/perodect.model");
const { SubcategoryModel } = require("../../models/Subcategory");
const { SubsubcategoryModel } = require("../../models/Subsubcategory");

let producteditela = async (req, res) => {
  let { id } = req.params;
  let diteleddata = await ProductModel.findOne({ _id: id })
    .populate("color", "colorName")
    .populate("material", "materialName")
    .populate("Category", "categoryName")
    .populate("SubCategory", "SubcategoryName")
    .populate("SubsubCategory", "SubsubcategoryName");

  res.send({
    _status: "success",
    _massage: "product data fetch successfully",
    path: process.env.PRODUCTIMAGEPATH,
    data: diteleddata,
  });
};

let getWebSidebarFilters = async (req, res) => {
  try {
    // 1. Saare active products fetch karein (sirf IDs aur Names ke saath)
    let products = await ProductModel.find({
      isdeleted: false,
      Productstatus: true,
    })
      .populate("Category", "categoryName")
      .populate("SubCategory", "SubcategoryName")
      .populate("SubsubCategory", "SubsubcategoryName")
      .select("Category SubCategory SubsubCategory");

    // 2. Sirf Categories aur SubCategories ki unique list nikalne ka asaan tarika
    const categories = await categoryModel
      .find({ categorystatus: true })
      .select("categoryName");
    const subcategories = await SubcategoryModel.find({
      Subcategorystatus: true,
    }).select("SubcategoryName Category");

    const subsubCategories = await SubsubcategoryModel.find({
      Subsubcategorystatus: true,
    }).select("SubsubcategoryName Category SubCategory");
    console.log(subsubCategories, "subsubCategories");

    // 3. Materials aur Colors fetch karein
    const materials = await materialModel
      .find({ materialstatus: true })
      .select("materialName");
    const colors = await colorModel
      .find({ colorstatus: true })
      .select("colorName");

    // Response bhej do - grouping frontend par handle karna zyada asaan hai
    res.status(200).send({
      status: true,
      categories, // Saari Main Categories (Table, Mirror etc.)
      subcategories, // Saari Sub Categories (Coffee Table, Wooden Mirror etc.)
      subsubCategories, // Saari Sub-Sub Categories (Modern Coffee Table, Traditional Wooden Mirror etc.)
      materials,
      colors,
    });
  } catch (err) {
    res
      .status(500)
      .send({ status: false, message: "Server Error: " + err.message });
  }
};

let product_website_viwe = async (req, rec) => {
  try {
    let {
      subsubcategories,
      categories,
      materials,
      colors,
      minPrice,
      maxPrice,
      sort,
    } = req.query;

    // 1. Base Filter
    let filter = {
      isdeleted: false,
      Productstatus: true,
    };

    // 2. Category Filter (Check if it's not empty)
    if (categories && categories.trim() !== "") {
      // DHYAN DEIN: Agar ye subcategory ki IDs hain, toh field ka naam SubCategory likhein
      filter.SubCategory = { $in: categories.split(",") };
    }

    if (subsubcategories && subsubcategories.trim() !== "") {
      // DHYAN DEIN: Yahan field ka naam wahi rakhein jo Product Model mein hai (e.g., SubsubCategory)
      filter.SubsubCategory = { $in: subsubcategories.split(",") };
    }

    // 3. Material Filter (Check if it's not empty)
    if (materials && materials.trim() !== "") {
      filter.material = { $in: materials.split(",") };
    }

    // 4. Color Filter (Check if it's not empty)
    if (colors && colors.trim() !== "") {
      filter.color = { $in: colors.split(",") };
    }

    // 5. Price Filter
    if (minPrice || maxPrice) {
      filter.SalePrice = {
        $gte: Number(minPrice) || 0,
        $lte: Number(maxPrice) || 999999,
      };
    }

    // Debugging ke liye ye line on karein (Terminal mein filter dikhega)
    // console.log("Final Filter:", JSON.stringify(filter, null, 2));

    // 6. Sorting Logic
    let sortOption = {};
    if (sort == "1") sortOption = { ProductName: 1 };
    if (sort == "2") sortOption = { ProductName: -1 };
    if (sort == "3") sortOption = { SalePrice: 1 };
    if (sort == "4") sortOption = { SalePrice: -1 };

    let data = await ProductModel.find(filter)
      .populate("Category", "categoryName")
      .populate("SubCategory", "SubcategoryName")
      .populate("SubsubCategory", "SubsubcategoryName") // <-- Is spelling ko Schema se match karein
      .populate("color", "colorName")
      .populate("material", "materialName")
      .sort(sortOption);

      console.log(data, "filtered products");
      

    rec.status(200).send({
      status: true,
      path: process.env.PRODUCTIMAGEPATH,
      data,
    });
  } catch (err) {
    rec.status(500).send({ status: false, message: err.message });
  }
};
module.exports = {
  producteditela,
  product_website_viwe,
  getWebSidebarFilters,
};
