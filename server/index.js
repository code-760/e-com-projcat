const express=require("express");
const { adminRoutes } = require("./App/routes/admin/adminRoutes");
let mongoose=require("mongoose")
let App=express();
let cous=require("cors")
require("dotenv").config()
 App.use(cous())
App.use(express.json())


App.use('/admin',adminRoutes)
App.use('/uploads/category',express.static("uploads/category"))
App.use('/uploads/WhyChooseUs',express.static("uploads/WhyChooseUs"))
App.use('/uploads/Sliders',express.static("uploads/Sliders"))




mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DBNAME}`)
.then(()=>{
    App.listen(process.env.PORT,()=>{
    console.log("server start" , process.env.PORT);
    
})


});