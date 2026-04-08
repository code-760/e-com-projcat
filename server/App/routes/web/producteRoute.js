let express  =require("express")

const { producteditela, product_website_viwe, getWebSidebarFilters } = require("../../controler/web/productecomtroller")
let producteRoutes=express.Router()

producteRoutes.get("/productsditled/:id",producteditela)
producteRoutes.get("/products",product_website_viwe)
producteRoutes.get("/sidebar-filters",getWebSidebarFilters)



module.exports={producteRoutes}