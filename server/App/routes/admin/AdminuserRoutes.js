let express = require("express");
const { Admingooglelogin, admindetail, updateadmin } = require("../../controler/admin/authocontroller");
const { fileuplode } = require("../../middlewera/fileupdole");
let AdminRoutes = express.Router();

let uploads=fileuplode("uploads/Adminprofile")

AdminRoutes.post('/Admin-google-login', Admingooglelogin);
AdminRoutes.post('/user-detail',admindetail);
AdminRoutes.put('/admin-update', uploads.single("Adminprofile"), updateadmin)



module.exports = AdminRoutes;