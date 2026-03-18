let express  =require("express")
const { userRoutes } = require("./userRoutes")
const homeRoutes = require("./homeRoutes")
const { producteRoutes } = require("./producteRoute")
const { CartRoutes } = require("./cartRoutes")
const OderRoutes = require("./OderRoutes")



let webRoutes=express.Router()


webRoutes.use("/user",userRoutes)
webRoutes.use("/home-items",homeRoutes)
webRoutes.use("/product",producteRoutes)
webRoutes.use("/cart",CartRoutes)
webRoutes.use("/order",OderRoutes)


module.exports={webRoutes}