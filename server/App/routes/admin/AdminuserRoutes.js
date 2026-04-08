let express = require("express");
const { Admingooglelogin } = require("../../controler/admin/authocontroller");
let AdminRoutes = express.Router();

AdminRoutes.post('/Admin-google-login', Admingooglelogin);
AdminRoutes.('/Admin-google-login', Admingooglelogin);



module.exports = AdminRoutes;