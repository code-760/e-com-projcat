let express = require("express");
const { Countryviwe, Countrycreate, Countrydelete, multidelete, changeStatus, getditelds, CountryUpdate } = require("../../controler/admin/Countryconntroler");


let CountryRoutes = express.Router();

CountryRoutes.post("/create",Countrycreate);
CountryRoutes.get("/viwe",Countryviwe);
CountryRoutes.delete("/delete/:id",Countrydelete);
CountryRoutes.post("/multidelete",multidelete);
CountryRoutes.post('/change-status',changeStatus);
CountryRoutes.get('/get-deteils/:id',getditelds)
CountryRoutes.put('/update/:id',CountryUpdate)

module.exports = { CountryRoutes };
