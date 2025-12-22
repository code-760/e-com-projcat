let express = require("express");

let SubcategoryRoutes = express.Router();
let multer = require("multer");
const { fileuplode } = require("../../middlewera/fileupdole");
const {
  Subcategorycreate,
  Subcategoryviwe,
  Subcategorydelete,
  multidelete,
  changeStatus,
  parnetcategroy,
} = require("../../controler/admin/Subcategorycontrollet");

// let uplodes = multer({ dest: "uploads/category" });
let uploads = fileuplode("uploads/Subcategory");
SubcategoryRoutes.post(
  "/create",
  uploads.single("Subcategoryimg"),
  Subcategorycreate
);
SubcategoryRoutes.get("/viwe", Subcategoryviwe);
SubcategoryRoutes.get("/parnt-categroy",parnetcategroy);
SubcategoryRoutes.delete("/delete/:id", Subcategorydelete);

SubcategoryRoutes.post("/multidelete", multidelete);
SubcategoryRoutes.post("/change-status", changeStatus);

module.exports = { SubcategoryRoutes };
