const express=require("express");
const { adminRoutes } = require("./App/routes/admin/adminRoutes");
let mongoose=require("mongoose")
let App=express();
let cous=require("cors");
const { webRoutes } = require("./App/routes/web/wedRoutes");
require("dotenv").config()
App.use(cous({
  origin: [
    "https://e-com-projcat.vercel.app",        // Tumhari Furniture site
    "https://e-com-projcat-ew3h.vercel.app",   // Tumhara Admin Panel
    "http://localhost:5173",                   // Local development ke liye
    "http://localhost:3000"
  ],
  credentials: true, // Agar tum cookies ya headers use kar rahe ho
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

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




// 1. Ek variable banao jo pehle Live DB dhoondega, agar nahi mila toh Local DB uthayega
const DB_URL = process.env.MONGO_URI || `mongodb://127.0.0.1:27017/${process.env.DBNAME}`;

// 2. Mongoose ko connect karo
mongoose.connect(DB_URL)
  .then(() => {
    // 3. Server start karo
    App.listen(process.env.PORT || 8000, () => {
      console.log(`🚀 Server start on port: ${process.env.PORT || 8000}`);
      
      // Ye line tumhe console mein bata degi ki kaunsa DB connect hua hai
      if(process.env.MONGO_URI) {
          console.log("🌐 Database: LIVE (MongoDB Atlas) Connect ho gaya!");
      } else {
          console.log("💻 Database: LOCAL (127.0.0.1) Connect ho gaya!");
      }
    });
  })
  .catch((err) => {
    console.log("❌ Database Connection Error: ", err);
  });

