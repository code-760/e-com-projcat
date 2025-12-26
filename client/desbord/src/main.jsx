import { StrictMode, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "./Layout.jsx";
import Profile from "./comenpege/profile/profile.jsx";
import Complitprofile from "./comenpege/profile/complitprofile.jsx";
import Viewuser from "./comenpege/desbordpeage/Viewuser.jsx";
import Color from "./comenpege/desbordpeage/color.jsx";
import ContactEnquirys from "./comenpege/desbordpeage/ContactEnquirys.jsx";
import Newsletters from "./comenpege/desbordpeage/Newsletters.jsx";
import Viewcategory from "./comenpege/desbordpeage/ViewCategory.jsx";
import Viewcolor from "./comenpege/desbordpeage/ViewColor.jsx";
import Viewcountry from "./comenpege/desbordpeage/ViewCountry.jsx";
import Viewfaq from "./comenpege/desbordpeage/ViewFaq.jsx";
import Viewmaterial from "./comenpege/desbordpeage/ViewMaterial.jsx";
import Viewslider from "./comenpege/desbordpeage/ViewSlider.jsx";
import Viewsubcategory from "./comenpege/desbordpeage/ViewSubCategory.jsx";
import Viewsubsubcategory from "./comenpege/desbordpeage/ViewSubSubCategory.jsx";
import View_testimonial from "./comenpege/desbordpeage/ViewTestimonial.jsx";
import View_why_chooseUs from "./comenpege/desbordpeage/ViewWhyChooseUs.jsx";
import Desbord from "./comenpege/profile/desbord.jsx";
import Add_Material from "./comenpege/desbordpeage/Add_Material.jsx";
import Add_Category from "./comenpege/desbordpeage/Add_Category.jsx";
import Add_Sub_category from "./comenpege/desbordpeage/Add_Sub_category.jsx";
import Add_sub_sub_category from "./comenpege/desbordpeage/Add_sub_sub_category.jsx";
import View_Product from "./comenpege/desbordpeage/view_Product.jsx";
import Add_product from "./comenpege/desbordpeage/Add_product.jsx";
import Add_sidebar from "./comenpege/desbordpeage/Add_sidebar.jsx";
import Add_Why_Choose_Us from "./comenpege/desbordpeage/Add_Why_Choose_Us.jsx";
import Add_Country from "./comenpege/desbordpeage/Add Country.jsx";
import Add_Faq from "./comenpege/desbordpeage/Add_Faq.jsx";

import Login from "./assets/login.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Add_Testimonial from "./comenpege/desbordpeage/Add_Testimonial.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="" element={<Layout />}>
        <Route path="/" element={<Desbord />} />

        <Route path="/Viewuser" element={<Viewuser />} />
        {/* color */}
        <Route path="/color" element={<Color />} />
        <Route path="/updete/:id?" element={<Color />} />
        <Route path="/ViewColor" element={<Viewcolor />} />

        <Route path="/ContactEnquirys" element={<ContactEnquirys />} />
        <Route path="/Newsletters" element={<Newsletters />} />

        <Route path="/Add_Country" element={<Add_Country />} />
        <Route path="/update/:id?" element={<Add_Country />} />
        <Route path="/ViewCountry" element={<Viewcountry />} />

        <Route path="/ViewFaq" element={<Viewfaq />} />
        <Route path="/Add_Faq" element={<Add_Faq />} />
        <Route path="/Faqupdate/:id?" element={<Add_Faq />} />

        <Route path="/Add_Material" element={<Add_Material />} />
        <Route path="/ViewMaterial" element={<Viewmaterial />} />
        <Route path="/Material_update/:id?" element={<Add_Material />} />

        <Route path="/Add_sidebar" element={<Add_sidebar />} />
        <Route path="/sidebar-update/:id?" element={<Add_sidebar />} />
        <Route path="/ViewSlider" element={<Viewslider />} />

        <Route path="/Add_Category" element={<Add_Category />} />
        <Route path="/catupdete/:id?" element={<Add_Category />} />
        <Route path="/ViewCategory" element={<Viewcategory />} />

        <Route
          path="/Add_sub_sub_category"
          element={<Add_sub_sub_category />}
        />
        <Route path="/ViewSubSubCategory" element={<Viewsubsubcategory />} />

        <Route path="/Add_Why_Choose_Us" element={<Add_Why_Choose_Us />} />
        <Route
          path="/Add-Why-Choose-Us-updete/:id?"
          element={<Add_Why_Choose_Us />}
        />
        <Route path="/View_why_chooseUs" element={<View_why_chooseUs />} />

        <Route path="/Add_Testimonial" element={<Add_Testimonial />} />
        <Route path="/Update_Testimonial/:id?" element={<Add_Testimonial />} />
        <Route path="/Viewtestimonial" element={<View_testimonial />} />

        <Route path="/ViewSubCategory" element={<Viewsubcategory />} />
        <Route path="/Update-SubCategory/:id?" element={<Add_Sub_category />} />
        <Route path="/Add_Sub_category" element={<Add_Sub_category />} />

        <Route path="/View_Product" element={<View_Product />} />
        <Route path="/Add_Product" element={<Add_product />} />
      </Route>
      <Route path="/Profile" element={<Profile />} />
      <Route path="/Complitprofile" element={<Complitprofile />} />

      {/* CATCH-ALL (IMPORTANT) */}
    </Routes>
  </BrowserRouter>
);
