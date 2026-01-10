const fs = require("fs");
const path = require("path");
const { categoryModel } = require("../../models/Category.model");
const { colorModel } = require("../../models/color.model");
const { materialModel } = require("../../models/material.model");
const { ProductModel } = require("../../models/perodect.model");
const { SubcategoryModel } = require("../../models/Subcategory");
const { SubsubcategoryModel } = require("../../models/Subsubcategory");
const { log } = require("console");


let Productcreate = async (req, rec) => {

  let insertobj = { ...req.body };

  console.log(insertobj);
  

  if (req.files) {
    if (req.files.ProductImage) {
      insertobj.ProductImage = req.files.ProductImage[0].filename;
    }

    if (req.files.BackImage) {
      insertobj.BackImage = req.files.BackImage[0].filename;
    }

    if (req.files.GalleryImage) {
      insertobj.GalleryImage = req.files.GalleryImage.map(
        (file) => file.filename
      );
    }
  }

  try {
    let Product = await new ProductModel(insertobj);
    let ProductRec = await Product.save();

  
   
    

    rec.send({
      status: true,
      messages: "create api",
      ProductRec,
    });
  } catch (err) {
    let error = {};

    for (let key in err.errors) {
      error[key] = err.errors[key].message;
    }

    if (err.code == 11000) {
      error.ProductName = "Product name already exists";
    }

    rec.send({
      status: false,
      messages: "error found",
      error,
    });
  }

  console.log(req.body );
  
};

let Productviwe = async (req, rec) => {
  let filterSubsubcategory = {
    deletdat: null,
  };

  let date = await ProductModel.find(filterSubsubcategory)
    .populate("Category", "categoryName")
    .populate("SubCategory", "SubcategoryName")
    .populate("SubsubCategory", "SubsubcategoryName")
    .populate("color", "colorName")
    .populate("material", "materialName");
  //  {poputale<-- ka kam hai ki vo pernet category ka deta dikhata hai ye un me se deta nikal kar lata hai  }

  rec.send({
    status: true,
    messages: "create api",
    path: process.env.PRODUCTIMAGEPATH,
    date,
  });
};

// This data is coming from the parent category

let parnetcategroy = async (req, rec) => {
  let date = await categoryModel
    .find({ categorystatus: true, deletdat: null })
    .select("categoryName");
  // //  {poputale<-- ka kam hai ki vo pernet category ka deta dikhata hai ye un me se deta nikal kar lata hai  }

  rec.send({
    status: true,
    messages: "create api",
    date,
  });
};

// This data is coming from the subcategroy
let subcategroy = async (req, rec) => {
  let { parnetid } = req.params;

  let date = await SubcategoryModel.find({
    Subcategorystatus: true,
    Category: parnetid,
    deletdat: null,
  }).select("SubcategoryName");

  rec.send({
    status: true,
    messages: "subcatgroy aad api",
    date,
  });
};

// This data is coming from the Sub sub categroy

let Subsubcategroy = async (req, rec) => {
  console.log(req);

  let { subparnetid } = req.params;

  let date = await SubsubcategoryModel.find({
    Subsubcategorystatus: true,
    SubCategory: subparnetid,
    deletdat: null,
  }).select("SubsubcategoryName");
  rec.send({
    status: true,
    messages: "subcatgroy aad api",
    date,
  });
};

let Material = async (req, rec) => {
  let deta = await materialModel.find({ materialstatus: true, deletdat: null });
  rec.send({
    status: true,
    messages: "material data",
    deta,
  });
};

let color = async (req, rec) => {
  let deta = await colorModel.find({ colorstatus: true, deletdat: null });
  rec.send({
    status: true,
    messages: "color data",
    deta,
  });
};

let getditelds = async (req, rec) => {
  let { id } = req.params;

  let data = await ProductModel.findOne({ _id: id })
    .populate("Category", "categoryName")
    .populate("SubCategory", "SubcategoryName")
    .populate("SubsubCategory", "SubsubcategoryName")
    .populate("color", "colorName")
    .populate("material", "materialName");

  rec.send({
    status: true,
    messages: " product  detles",
    path: process.env.PRODUCTIMAGEPATH,
    data,
  });
};

let multidelete = async (req, rec) => {
  let { ids } = req.body;
  //arry
  let softdelRes = await ProductModel.updateMany(
    {
      _id: { $in: ids },
    },
    {
      $set: {
        isdeleted: true,
        deletdat: Date.now(),
      },
    }
  );

  rec.send({
    status: true,
    messages: " Subcategory deleted",
    softdelRes,
  });
};

let changeStatus = async (req, res) => {
  console.log(req.body);
  let { ids } = req.body;

  let updetdeta = await ProductModel.updateMany(
    { _id: ids },
    [
      {
        $set: {
          Productstatus: {
            $not: "$Productstatus",
          },
        },
      },
    ],
    { updatePipeline: true }
  );
  res.send({
    _status: true,
    _message: "subsubcategoroy Status Chnaged",
    updetdeta,
  });
};

let productUpdate = async (req, res) => {
  try {
    let { id } = req.params;

    // 1️⃣ Old product
    let oldProduct = await ProductModel.findById(id);

    if (!oldProduct) {
      return res.status(404).send({
        _status: false,
        _message: "Product not found",
      });
    }

    // 2️⃣ Body destructure
    let {
    
      ProductName,
      Category,
      SubCategory,
      SubsubCategory,
      color,
      material,
      ProductType,
      BestSelling,
      TopRated,
      Upsell,
      ActualPrice,
      SalePrice,
      Description,
      Order,
      TotalInStocks,
      Productstatus,
    } = req.body;

    // 3️⃣ Update object
    let updateObj = {
      ProductName,
      Category,
      SubCategory,
      SubsubCategory,
      color,
      material,
      ProductType,
      BestSelling,
      TopRated,
      Upsell,
      ActualPrice,
      SalePrice,
      Description,
      Order,
      TotalInStocks,
      Productstatus,
    };

    // 4️⃣ Upload path
    const uploadPath = path.join(
      __dirname,
      "../uploads/products"
    );

  console.log(uploadPath);
  

    // 5️⃣ Images
   if (req.files) {

  // 🔹 ProductImage
  if (req.files.ProductImage) {
    if (oldProduct.ProductImage) {
      let oldPath = path.join(
        uploadPath,
        oldProduct.ProductImage
      );
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    updateObj.ProductImage =
      req.files.ProductImage[0].filename;
  }

  // 🔹 BackImage
  if (req.files.BackImage) {
    if (oldProduct.BackImage) {
      let oldPath = path.join(
        uploadPath,
        oldProduct.BackImage
      );
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    updateObj.BackImage =
      req.files.BackImage[0].filename;
  }

  // 🔹 GalleryImage
  if (req.files.GalleryImage) {
    if (oldProduct.GalleryImage?.length) {
      oldProduct.GalleryImage.forEach((img) => {
        let imgPath = path.join(uploadPath, img);
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      });
    }

    updateObj.GalleryImage =
      req.files.GalleryImage.map((f) => f.filename);
  }

}

    // 6️⃣ Update DB
    let updateRes = await ProductModel.updateOne(
      { _id: id },
      { $set: updateObj }
    );

    res.send({
      _status: true,
      _message: "Product Updated",
      updateRes,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({
      _status: false,
      _message: "Server Error",
      error: error.message,
    });
  }
};


module.exports = {
  parnetcategroy,
  subcategroy,
  Subsubcategroy,
  Material,
  color,
  Productcreate,
  Productviwe,
  getditelds,
  multidelete,
  changeStatus,
  productUpdate,
};
