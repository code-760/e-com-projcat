let express = require("express");

let ProductRoutes = express.Router();
// let multer = require("multer");
const { fileuplode } = require("../../middlewera/fileupdole");
const { parnetcategroy, subcategroy, Subsubcategroy, Material, color, Productcreate, Productviwe, getditelds, multidelete, changeStatus, productUpdate } = require("../../controler/admin/productcontroller");


// let uplodes = multer({ dest: "uploads/category" });

ProductRoutes.get("/parnt-categroy",parnetcategroy)
let uploads = fileuplode("uploads/productimgs");
 ProductRoutes.post(
  "/create",
  uploads.fields([
    {
        name:'ProductImage',
        maxCount:1
    },
    {
         name:'BackImage',
        maxCount:1
    },
    {
      name:'GalleryImage',
        maxCount:10   
    }
  ]),
  Productcreate
);
 ProductRoutes.get("/viwe",Productviwe);
 ;
 ProductRoutes.get("/sub-categroy/:parnetid",subcategroy);
 ProductRoutes.get("/Sub-sub-categroy/:subparnetid",Subsubcategroy);
 ProductRoutes.get("/Material",Material);
 ProductRoutes.get("/color",color);
//  ProductRoutes.delete("/delete/:id", Subsubcategorydelete);

 ProductRoutes.post("/multidelete", multidelete);
 ProductRoutes.post("/change-status", changeStatus);
 ProductRoutes.get("/get-deteils/:id",getditelds);
 ProductRoutes.put("/update/:id",  uploads.fields([
    {
        name:'ProductImage',
        maxCount:1
    },
    {
         name:'BackImage',
        maxCount:1
    },
    {
      name:'GalleryImage',
        maxCount:10   
    }
  ]),productUpdate)

module.exports = { ProductRoutes };
