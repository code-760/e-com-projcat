let express = require("express");

let ProductRoutes = express.Router();
// let multer = require("multer");

const {
  parnetcategroy,
  subcategroy,
  Subsubcategroy,
  Material,
  color,
  Productviwe,
  getditelds,
  multidelete,
  changeStatus,
  productUpdate,
  Productcreate,
} = require("../../controler/admin/productcontroller");
const { fileuplode } = require("../../middlewera/fileupdole");

// let uplodes = multer({ dest: "uploads/category" });
let uploads = fileuplode("productimgs");

ProductRoutes.get("/parnt-categroy", parnetcategroy);
ProductRoutes.post(
  "/create",
  (req, res, next) => {
    uploads.fields([
      { name: "ProductImage", maxCount: 1 },
      { name: "BackImage", maxCount: 1 },
      { name: "GalleryImage", maxCount: 10 },
    ])(req, res, (err) => {
      if (err) {
        // Agar photo upload mein error hai toh yahan pakda jayega
        console.log("MULTER/CLOUDINARY ERROR:", err);
        return res.status(400).json({ status: false, message: err.message });
      }
      next();
    });
  },
  Productcreate,
);
ProductRoutes.get("/viwe", Productviwe);
ProductRoutes.get("/sub-categroy/:parnetid", subcategroy);
ProductRoutes.get("/Sub-sub-categroy/:subparnetid", Subsubcategroy);
ProductRoutes.get("/Material", Material);
ProductRoutes.get("/color", color);
//  ProductRoutes.delete("/delete/:id", Subsubcategorydelete);

ProductRoutes.post("/multidelete", multidelete);
ProductRoutes.post("/change-status", changeStatus);
ProductRoutes.get("/get-deteils/:id", getditelds);
ProductRoutes.put(
  "/update/:id",
  uploads.fields([
    {
      name: "ProductImage",
      maxCount: 1,
    },
    {
      name: "BackImage",
      maxCount: 1,
    },
    {
      name: "GalleryImage",
      maxCount: 10,
    },
  ]),
  productUpdate,
);

module.exports = { ProductRoutes };
