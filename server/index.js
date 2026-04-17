require("dotenv").config();
const express = require("express");
const { adminRoutes } = require("./App/routes/admin/adminRoutes");
let mongoose = require("mongoose");
let App = express();
let cors = require("cors"); // Fix: Spelling corrected (cous -> cors)
const { webRoutes } = require("./App/routes/web/wedRoutes");

App.use(cors({
  origin: [
    "https://e-com-projcat.vercel.app",        // Fix: Removed trailing slash
    "https://e-com-projcat-ew3h.vercel.app",   // Fix: Removed trailing slash
    "http://localhost:5173",
    "http://localhost:3000"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

App.use(express.json());

App.get('/', (req, res) => {
    res.send("E-Furniture Backend is Live and Running Perfectly! 🚀");
});

// Routes
App.use('/admin', adminRoutes);
App.use('/uploads/category', express.static("uploads/category"));
App.use('/uploads/Subcategory', express.static("uploads/Subcategory"));
App.use('/uploads/Subsubcategory', express.static("uploads/Subsubcategory"));
App.use('/uploads/WhyChooseUs', express.static("uploads/WhyChooseUs"));
App.use('/uploads/Sliders', express.static("uploads/Sliders"));
App.use('/uploads/Tastimonial', express.static("uploads/Tastimonial"));
App.use('/uploads/productimgs', express.static("uploads/productimgs"));
App.use('/uploads/users', express.static("uploads/users"));

App.use('/web', webRoutes);

// Database Connection Logic
const DB_URL = process.env.MONGO_URI || `mongodb://127.0.0.1:27017/${process.env.DBNAME}`;

mongoose.connect(DB_URL)
  .then(() => {
    const PORT = process.env.PORT || 8000;
    App.listen(PORT, () => {
      console.log(`🚀 Server start on port: ${PORT}`);
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