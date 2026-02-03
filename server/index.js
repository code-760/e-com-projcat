const express=require("express");
const { adminRoutes } = require("./App/routes/admin/adminRoutes");
let mongoose=require("mongoose")
let App=express();
let cous=require("cors");
const { webRoutes } = require("./App/routes/web/wedRoutes");
require("dotenv").config()
 App.use(cous())
App.use(express.json())


App.use('/admin',adminRoutes)
App.use('/uploads/category',express.static("uploads/category"))
App.use('/uploads/Subcategory',express.static("uploads/Subcategory"))
App.use('/uploads/Subsubcategory',express.static("uploads/Subsubcategory"))
App.use('/uploads/WhyChooseUs',express.static("uploads/WhyChooseUs"))
App.use('/uploads/Sliders',express.static("uploads/Sliders"))
App.use('/uploads/Tastimonial',express.static("uploads/Tastimonial"))
App.use('/uploads/productimgs',express.static("uploads/productimgs"))
App.use('/uploads/users',express.static("uploads/users"))

App.use('/web',webRoutes)




mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DBNAME}`)
.then(()=>{
    App.listen(process.env.PORT,()=>{
    console.log("server start" , process.env.PORT);
    
})


});