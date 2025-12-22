let express = require("express");

let WhyChooseUsRoutes = express.Router();
// let multer = require("multer");
const { fileuplode } = require("../../middlewera/fileupdole");
const { WhyChooseUscreate, WhyChooseUsviwe, WhyChooseUsdelete, multidelete, changeStatus } = require("../../controler/admin/WhyChooseUsController");

// let uplodes = multer({ dest: "uploads/category" });

let uploads=fileuplode("uploads/WhyChooseUs")


 WhyChooseUsRoutes.post("/create", uploads.single("WhyChooseUsimg"),WhyChooseUscreate);
 WhyChooseUsRoutes.get("/viwe",WhyChooseUsviwe);
 WhyChooseUsRoutes.delete("/delete/:id",WhyChooseUsdelete);

 WhyChooseUsRoutes.post("/multidelete", multidelete);
 WhyChooseUsRoutes.post("/change-status", changeStatus);

module.exports = { WhyChooseUsRoutes };
