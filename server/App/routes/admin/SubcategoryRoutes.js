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
  getditelds,
  SubcategoryUpdate,
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
SubcategoryRoutes.get("/get-deteils/:id",getditelds);
SubcategoryRoutes.put("/update/:id", uploads.single("Subcategoryimg"),SubcategoryUpdate);

module.exports = { SubcategoryRoutes };
