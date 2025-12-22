let express = require("express");
const {
  colorcreate,
  colorviwe,
  colordelete,
  multidelete,
  changeStatus,
  getditelds,
  colorUpdate,
} = require("../../controler/admin/colorConntroler");
let colorRoutes = express.Router();

colorRoutes.post("/create", colorcreate);
colorRoutes.get("/viwe", colorviwe);
colorRoutes.delete("/delete/:id", colordelete);
colorRoutes.post("/multidelete", multidelete);
colorRoutes.post('/change-status',changeStatus);
colorRoutes.get('/get-deteils/:id',getditelds)
colorRoutes.put('/update/:id',colorUpdate)


module.exports = {colorRoutes} ;
