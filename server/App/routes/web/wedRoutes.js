let express  =require("express")
const { userRoutes } = require("./userRoutes")
const homeRoutes = require("./homeRoutes")
const { producteRoutes } = require("./producteRoute")
const { CartRoutes } = require("./cartRoutes")



let webRoutes=express.Router()


webRoutes.use("/user",userRoutes)
webRoutes.use("/home-items",homeRoutes)
webRoutes.use("/product",producteRoutes)
webRoutes.use("/cart",CartRoutes)


module.exports={webRoutes}