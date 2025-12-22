let express = require("express");
const { materialcreate, materialviwe, materialdelet, multidelet, materialdelete, multidelete, changeStatus, getditelds, materialUpdate } = require("../../controler/admin/materialcontroler");

let materialRoutes = express.Router();


materialRoutes.post('/create',materialcreate )
materialRoutes.get('/viwe',materialviwe)
materialRoutes.delete('/delete/:id',materialdelete)
materialRoutes.post('/multidelete/',multidelete)
materialRoutes.post('/change-status',changeStatus);
materialRoutes.get('/get-deteils/:id',getditelds)
materialRoutes.put('/update/:id',materialUpdate)







module.exports = { materialRoutes }