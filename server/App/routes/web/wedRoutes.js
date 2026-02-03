let express  =require("express")
const { userRoutes } = require("./userRoutes")


let webRoutes=express.Router()

webRoutes.use("/user",userRoutes)



module.exports={webRoutes}