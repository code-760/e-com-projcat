let express = require("express");

const { materialRoutes } = require("./material.Routes");
const { colorRoutes } = require("./colorRoutes");
const { FaqRoutes } = require("./Faqroutes");
const { CountryRoutes } = require("./CountryRoutes");
const { CategoryRoutes } = require("./categoryRoutes ");
const { SubcategoryModel } = require("../../models/Subcategory");
const { SubcategoryRoutes } = require("./SubcategoryRoutes");
const { WhyChooseUsRoutes } = require("./WhyChooseUsRoutes");
const {  SliderRoutes } = require("./SlidersRoutes");

let adminRoutes = express.Router();

adminRoutes.use("/color", colorRoutes);

adminRoutes.use("/material", materialRoutes);

adminRoutes.use("/Faq", FaqRoutes);
adminRoutes.use("/Country", CountryRoutes);
adminRoutes.use("/category",CategoryRoutes);
adminRoutes.use("/Subcategory",SubcategoryRoutes);
adminRoutes.use("/WhyChooseUs",WhyChooseUsRoutes);
adminRoutes.use("/Slider",SliderRoutes);



module.exports = { adminRoutes };
