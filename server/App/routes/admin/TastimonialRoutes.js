let express = require("express");

let TastimonialRoutes = express.Router();
// let multer = require("multer");
const { fileuplode } = require("../../middlewera/fileupdole");
const { Tastimonialviwe, Tastimonialcreate, Tastimonialdelete, multidelete, getditelds, TastimonialUpdate, changeStatus } = require("../../controler/admin/Tastimonoalcontroller");


// let uplodes = multer({ dest: "uploads/category" });

let uploads = fileuplode("uploads/Tastimonial");

TastimonialRoutes.post(
  "/create",
  uploads.single("Tastimonialimg"),
  Tastimonialcreate
);
TastimonialRoutes.get("/viwe", Tastimonialviwe);
TastimonialRoutes.delete("/delete/:id", Tastimonialdelete);

TastimonialRoutes.post("/multidelete", multidelete);
TastimonialRoutes.post("/change-status", changeStatus);
TastimonialRoutes.get("/get-deteils/:id", getditelds);
TastimonialRoutes.put("/update/:id", uploads.single("Tastimonialimg"),TastimonialUpdate);

module.exports = { TastimonialRoutes };
