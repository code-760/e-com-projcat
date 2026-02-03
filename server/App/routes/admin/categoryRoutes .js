let express = require("express");

let CategoryRoutes = express.Router();
let multer = require("multer");
const { fileuplode } = require("../../middlewera/fileupdole");
const { categorycreate, categoryviwe, categorydelete, multidelete, getditelds, catUpdate, changeStatus } = require("../../controler/admin/CatrgoryController ");

// let uplodes = multer({ dest: "uploads/category" });

let uploads = fileuplode("uploads/category");

CategoryRoutes.post("/create", uploads.single("categoryimg"), categorycreate);
CategoryRoutes.get("/viwe", categoryviwe);
CategoryRoutes.delete("/delete/:id", categorydelete);

CategoryRoutes.post("/multidelete", multidelete);
CategoryRoutes.get("/get-deteils/:id", getditelds);
// CategoryRoutes.put("/update/:id", catUpdate);

CategoryRoutes.put("/update/:id", uploads.single("categoryimg"), catUpdate);

CategoryRoutes.post("/change-status", changeStatus);

module.exports = { CategoryRoutes };
