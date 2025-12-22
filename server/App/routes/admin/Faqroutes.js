let express = require("express");
const {
  Faqcreate,
  Faqview,
  Faqdelete,
  multidelete,
  changeStatus,
  getditelds,
  FaqUpdate,
} = require("../../controler/admin/Faqconntroler");

let FaqRoutes = express.Router();

FaqRoutes.post("/create", Faqcreate);

FaqRoutes.get("/viwe", Faqview);
FaqRoutes.delete("/delete", Faqdelete);
FaqRoutes.post("/multidelete", multidelete);
FaqRoutes.post('/change-status',changeStatus);
FaqRoutes.get('/get-deteils/:id',getditelds)
FaqRoutes.put('/update/:id',FaqUpdate)


module.exports = { FaqRoutes };
