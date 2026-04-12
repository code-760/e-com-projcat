const express=require("express");
const { adminRoutes } = require("./App/routes/admin/adminRoutes");
let mongoose=require("mongoose")
let App=express();
let cous=require("cors");
const { webRoutes } = require("./App/routes/web/wedRoutes");
require("dotenv").config()
 App.use(cous())
App.use(express.json())

App.get('/', (req, res) => {
    res.send("E-Furniture Backend is Live and Running Perfectly! 🚀");
});


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




mongoose.connect(process.env.MONGO_URI)
.then(() => {
  App.listen(process.env.PORT, () => {
    console.log("server start", process.env.PORT);
  });
})



