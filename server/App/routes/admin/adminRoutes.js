let express = require("express");

const { materialRoutes } = require("./material.Routes");
const { colorRoutes } = require("./colorRoutes");
const { FaqRoutes } = require("./Faqroutes");
const { CountryRoutes } = require("./CountryRoutes");
const { CategoryRoutes } = require("./categoryRoutes ");
const { SubcategoryRoutes } = require("./SubcategoryRoutes");
const { WhyChooseUsRoutes } = require("./WhyChooseUsRoutes");
const { SliderRoutes } = require("./SlidersRoutes");
const { TastimonialRoutes } = require("./TastimonialRoutes");
const { SubsubcategoryRoutes } = require("./SubsubcategoryRoutes");

const { ProductRoutes } = require("./productRoutes");
const userRoutes = require("./userRoutes");


const { orderRoutes } = require("./oderRoutes");
const { AdminRoutes } = require("./AdminuserRoutes");





let adminRoutes = express.Router();

adminRoutes.use("/color", colorRoutes);

adminRoutes.use("/material", materialRoutes);

adminRoutes.use("/Faq", FaqRoutes);
adminRoutes.use("/Country", CountryRoutes);
adminRoutes.use("/category", CategoryRoutes);
adminRoutes.use("/Subcategory", SubcategoryRoutes);
adminRoutes.use("/Subsubcategory",SubsubcategoryRoutes);
adminRoutes.use("/WhyChooseUs", WhyChooseUsRoutes);
adminRoutes.use("/Slider", SliderRoutes);
adminRoutes.use("/Tastimonial", TastimonialRoutes);
adminRoutes.use("/Product",ProductRoutes);
adminRoutes.use("/user",userRoutes);
adminRoutes.use("/oder-viwe",orderRoutes);
adminRoutes.use("/portal",AdminRoutes);

module.exports = { adminRoutes };
