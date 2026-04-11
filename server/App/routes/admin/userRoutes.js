let express = require("express");
const { userviwe, usermultidelete, userchangeStatus } = require("../../controler/admin/usercontrollr");

let userRoutes = express.Router();

userRoutes.get("/viwe-user", userviwe);

userRoutes.post("/user-multidelete", usermultidelete);
userRoutes.post("/user-changestatus", userchangeStatus);

module.exports = userRoutes;
