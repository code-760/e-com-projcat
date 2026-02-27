let express  =require("express")

const { producteditela } = require("../../controler/web/productecomtroller")
let producteRoutes=express.Router()

producteRoutes.get("/productsditled/:id",producteditela)



module.exports={producteRoutes}