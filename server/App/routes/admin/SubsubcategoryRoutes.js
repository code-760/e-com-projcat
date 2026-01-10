let express = require("express");

let SubsubcategoryRoutes = express.Router();
// let multer = require("multer");
const { fileuplode } = require("../../middlewera/fileupdole");
const { Subsubcategorycreate, Subsubcategoryviwe, parnetcategroy, Subsubcategorydelete, multidelete, changeStatus, getditelds, SubsubcategoryUpdate, subcategroy } = require("../../controler/admin/Subsubcategory-controller");


// let uplodes = multer({ dest: "uploads/category" });
let uploads = fileuplode("uploads/Subsubcategory");
SubsubcategoryRoutes.post(
  "/create",
  uploads.single("Subsubcategoryimg"),
  Subsubcategorycreate
);
SubsubcategoryRoutes.get("/viwe", Subsubcategoryviwe);
SubsubcategoryRoutes.get("/parnt-categroy",parnetcategroy);
SubsubcategoryRoutes.get("/sub-categroy/:parnetid",subcategroy);
SubsubcategoryRoutes.delete("/delete/:id", Subsubcategorydelete);

SubsubcategoryRoutes.post("/multidelete", multidelete);
SubsubcategoryRoutes.post("/change-status", changeStatus);
SubsubcategoryRoutes.get("/get-deteils/:id",getditelds);
SubsubcategoryRoutes.put("/update/:id", uploads.single("Subsubcategoryimg"),SubsubcategoryUpdate);

module.exports = { SubsubcategoryRoutes };
