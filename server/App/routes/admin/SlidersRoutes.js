let express=require("express")
let SliderRoutes=express.Router()

const { Sliderscreate, Slidersviwe, Slidersdelete, multidelete, changeStatus, getditelds, SlidersUpdate } = require("../../controler/admin/SlidersController");
// let multer = require("multer");
const { fileuplode } = require("../../middlewera/fileupdole");


// let uplodes = multer({ dest: "uploads/category" });

let uploads=fileuplode("uploads/Sliders")


 SliderRoutes.post("/create", uploads.single("Slidersimg"),Sliderscreate);
 SliderRoutes.get("/viwe",Slidersviwe);
 SliderRoutes.delete("/delete/:id",Slidersdelete);

 SliderRoutes.post("/multidelete", multidelete);
 SliderRoutes.post("/change-status", changeStatus);
 SliderRoutes.get("/get-deteils/:id", getditelds);
 SliderRoutes.put("/update/:id", uploads.single("Sliders"),SlidersUpdate);

module.exports = { SliderRoutes };
