import React, { useState } from 'react'
import { Link } from 'react-router'
import { BiBadgeCheck } from "react-icons/bi";





export default function Sidebar() {

    let [user, setuser] = useState(false)
    let [Enquiries, setEnquiries] = useState(false)
    let [Colors, setColors] = useState(false)
    let [Materials, setMaterials] = useState(false)
    let [ParentCate, setParentCate] = useState(false)
    let [SubCate, setSubCate] = useState(false)
    let [Sub_SubCate, setSub_SubCate] = useState(false)
    let [Products, setProducts] = useState(false)
    let [Why_Choose_Us, setWhy_Choose_Us] = useState(false)
    let [Orders, setOrders] = useState(false)
    let [Sliders, setSliders] = useState(false)
    let [Country, setCountry] = useState(false)
    let [Testimonials, setTestimonials] = useState(false)
    let [FAQs, setFAQs] = useState(false)
   
    return (
        <div>
            <div className="bg-[#374151] shadow-md overflow-y-auto min-h-screen scroll-smooth">
                <div className="p-4">
                    <img src='/images1.png' className="w-50 h-12" alt="" />
                </div>
                <nav className="mt-4 h-[700px] overflow-y-scroll">
                    <ul className="space-y-2 px-2 pb-8">

                         <li>
                            <Link to={"/"} className="flex items-center px-4 py-2 text-white rounded-[10px] hover:bg-[#7E22CE]">
                                <span className="mr-2">📄</span>
                              Desbord
                            </Link>


                        </li>




                        <li>
                            <div className="flex items-center px-4 py-2  text-white rounded-[10px] hover:bg-[#7E22CE]" onClick={() => setuser(prev => !prev)}>
                                <span className="mr-2">👥</span>
                                Users
                            </div>
                            <div className={`${user ? " block" : " hidden"}`}>
                                <ul >
                                    <li>

                                        <Link to={"/Viewuser"}>

                                            <div className="flex items-center px-4 py-2 text-white rounded-[10px] hover:bg-[#7E22CE]">
                                                <span className="mr-2"></span><BiBadgeCheck />
                                                view User
                                            </div>
                                        </Link>

                                    </li>

                                </ul>

                            </div>

                        </li>
                        <li>
                            <div className="flex items-center px-4 py-2 text-white rounded-[10px] hover:bg-[#7E22CE] "onClick={() => setEnquiries(prev => !prev)}>
                                <span className="mr-2">📝</span>
                                Enquiries
                            </div>
                            <div className={`${Enquiries ? " block" : " hidden"}`}>
                                <ul >
                                    <li>

                                        <Link to={"/ContactEnquirys"}>

                                            <div className="flex items-center px-4 py-2 text-white rounded-[10px] hover:bg-[#7E22CE]">
                                                <span className="mr-2"></span><BiBadgeCheck />
                                                Contact Enquirys
                                            </div>
                                        </Link>

                                    </li>
                                    <li>

                                        <Link to={"/Newsletters"}>

                                            <div className="flex items-center px-4 py-2 text-white rounded-[10px] hover:bg-[#7E22CE]">
                                                <span className="mr-2"></span><BiBadgeCheck />
                                                Newsletters
                                            </div>
                                        </Link>

                                    </li>

                                </ul>

                            </div>

                        </li>
                        <li>
                            <div className="flex items-center px-4 py-2 text-white rounded-[10px] hover:bg-[#7E22CE]"  onClick={() =>setColors(prev => !prev)}>
                                <span className="mr-2">🎨</span>
                                Colors
                            </div>
                            <div className={`${Colors ? " block" : " hidden"}`}>
                                <ul >
                                    <li>

                                        <Link to={"/color"}>

                                            <div className="flex items-center px-4 py-2 text-white rounded-[10px] hover:bg-[#7E22CE]">
                                                <span className="mr-2"></span><BiBadgeCheck />
                                                Add Color
                                            </div>
                                        </Link>

                                    </li>
                                    <li>

                                        <Link to={"/ViewColor"}>

                                            <div className="flex items-center px-4 py-2 text-white rounded-[10px] hover:bg-[#7E22CE]">
                                                <span className="mr-2"></span><BiBadgeCheck />
                                                View Color
                                            </div>
                                        </Link>

                                    </li>

                                </ul>

                            </div>

                        </li>
                        <li>
                            <div className="flex items-center px-4 py-2 text-white rounded-[10px] hover:bg-[#7E22CE]" onClick={() => setMaterials(prev => !prev)}>
                                <span className="mr-2">🧱</span>
                                Materials
                            </div>
                            <div className={`${Materials ? " block" : " hidden"}`}>
                                <ul >
                                    <li>

                                        <Link to={"/Add_Material"}>

                                            <div className="flex items-center px-4 py-2 text-white rounded-[10px] hover:bg-[#7E22CE]">
                                                <span className="mr-2"></span><BiBadgeCheck />
                                                Add Material


                                            </div>
                                        </Link>

                                    </li>
                                    <li>

                                        <Link to={"/ViewMaterial"}>

                                            <div className="flex items-center px-4 py-2 text-white rounded-[10px] hover:bg-[#7E22CE]">
                                                <span className="mr-2"></span><BiBadgeCheck />
                                                View Material
                                            </div>
                                        </Link>

                                    </li>

                                </ul>

                            </div>

                        </li>
                        <li>
                            <div className="flex items-center px-4 py-2 text-white rounded-[10px] hover:bg-[#7E22CE]" onClick={() => setParentCate(prev => !prev)}>
                                <span className="mr-2">📁</span>
                                Parent Categories
                            </div>
                            <div className={`${ParentCate ? " block" : " hidden"}`}>
                                <ul >
                                    <li>

                                        <Link to={"/Add_Category"}>

                                            <div className="flex items-center px-4 py-2 text-white rounded-[10px] hover:bg-[#7E22CE]">
                                                <span className="mr-2"></span><BiBadgeCheck />
                                                Add Category


                                            </div>
                                        </Link>

                                    </li>
                                    <li>

                                        <Link to={"/ViewCategory"}>

                                            <div className="flex items-center px-4 py-2 text-white rounded-[10px] hover:bg-[#7E22CE]">
                                                <span className="mr-2"></span><BiBadgeCheck />
                                                View Category
                                            </div>
                                        </Link>

                                    </li>

                                </ul>

                            </div>

                        </li>
                        <li>
                            <div className="flex items-center px-4 py-2 text-white rounded-[10px] hover:bg-[#7E22CE]"  onClick={() => setSubCate(prev => !prev)}>
                                <span className="mr-2">📂</span>
                                Sub Categories
                            </div>
                            <div className={`${SubCate ? " block" : " hidden"}`}>
                                <ul >
                                    <li>

                                        <Link to={"/Add_Sub_category"}>

                                            <div className="flex items-center px-4 py-2 text-white rounded-[10px] hover:bg-[#7E22CE]">
                                                <span className="mr-2"></span><BiBadgeCheck />
                                                Add Sub Category



                                            </div>
                                        </Link>

                                    </li>
                                    <li>

                                        <Link to={"/ViewSubCategory"}>

                                            <div className="flex items-center px-4 py-2 text-white rounded-[10px] hover:bg-[#7E22CE]">
                                                <span className="mr-2"></span><BiBadgeCheck />
                                                View Sub Category
                                            </div>
                                        </Link>

                                    </li>

                                </ul>

                            </div>

                        </li>
                        <li>
                            <div className="flex items-center px-4 py-2 text-white rounded-[10px] hover:bg-[#7E22CE]"  onClick={() => setSub_SubCate(prev => !prev)}>
                                <span className="mr-2">📂</span>
                                Sub Sub Categories
                            </div>
                            <div className={`${Sub_SubCate ? " block" : " hidden"}`}>
                                <ul >
                                    <li>

                                        <Link to={"/Add_sub_sub_category"}>

                                            <div className="flex items-center px-4 py-2 rounded-[10px] text-white hover:bg-[#7E22CE]">
                                                <span className="mr-2"></span><BiBadgeCheck />
                                                Add Sub Sub Category



                                            </div>
                                        </Link>

                                    </li>
                                    <li>

                                        <Link to={"/ViewSubSubCategory"}>

                                            <div className="flex items-center px-4 py-2 rounded-[10px] text-white hover:bg-[#7E22CE]">
                                                <span className="mr-2"></span><BiBadgeCheck />
                                                View Sub Sub Category
                                            </div>
                                        </Link>

                                    </li>

                                </ul>

                            </div>

                        </li>
                        <li>
                            <div className="flex items-center px-4 py-2 text-white rounded-[10px] hover:bg-[#7E22CE]"  onClick={() => setProducts(prev => !prev)}>
                                <span className="mr-2">📦</span>
                                Products
                            </div>
                            <div className={`${Products ? " block" : " hidden"}`}>
                                <ul >
                                    <li>

                                        <Link to={"/Add_Product"}>

                                            <div className="flex items-center px-4 py-2 rounded-[10px] text-white hover:bg-[#7E22CE]">
                                                <span className="mr-2"></span><BiBadgeCheck />
                                                Add Product


                                            </div>
                                        </Link>

                                    </li>
                                    <li>

                                        <Link to={"/View_Product"}>

                                            <div className="flex items-center px-4 py-2 rounded-[10px] text-white hover:bg-[#7E22CE]">
                                                <span className="mr-2"></span><BiBadgeCheck />
                                                view Product
                                            </div>
                                        </Link>

                                    </li>

                                </ul>

                            </div>
                        </li>
                        <li>
                            <div className="flex items-center px-4 py-2 text-white rounded-[10px] hover:bg-[#7E22CE]"  onClick={() => setWhy_Choose_Us(prev => !prev)}>
                                <span className="mr-2">✨</span>
                                Why Choose Us
                            </div>
                            <div className={`${Why_Choose_Us ? " block" : " hidden"}`}>
                                <ul >
                                    <li>

                                        <Link to={"/Add_Why_Choose_Us"}>

                                            <div className="flex items-center px-4 py-2 rounded-[10px] text-white hover:bg-[#7E22CE]">
                                                <span className="mr-2"></span><BiBadgeCheck />
                                                Add Why Choose Us


                                            </div>
                                        </Link>

                                    </li>
                                    <li>

                                        <Link to={"/View_why_chooseUs"}>

                                            <div className="flex items-center px-4 py-2 rounded-[10px] text-white hover:bg-[#7E22CE]">
                                                <span className="mr-2"></span><BiBadgeCheck />
                                                View Why Choose Us
                                            </div>
                                        </Link>

                                    </li>

                                </ul>

                            </div>

                        </li>
                        <li>
                            <div className="flex items-center px-4 py-2 text-white rounded-[10px] hover:bg-[#7E22CE]"  onClick={() => setOrders(prev => !prev)}>
                                <span className="mr-2">🛍️</span>
                                Orders
                            </div>
                            <div className={`${setOrders ? " block" : " hidden"}`}>
                                <ul >
                                    <li>

                                        <Link to={"/Viewuser"}>

                                            <div className="flex items-center px-4 py-2 rounded-[10px] text-white hover:bg-[#7E22CE]">
                                                <span className="mr-2"></span><BiBadgeCheck />
                                                Orders
                                            </div>
                                        </Link>

                                    </li>

                                </ul>

                            </div>

                        </li>
                        <li>
                            <div className="flex items-center px-4 py-2 text-white rounded-[10px] hover:bg-[#7E22CE]"  onClick={() => setSliders(prev => !prev)}>
                                <span className="mr-2">🎞️</span>
                                Sliders
                            </div>
                            <div className={`${Sliders ? " block" : " hidden"}`}>
                                <ul >
                                    <li>

                                        <Link to={"/Add_sidebar"}>

                                            <div className="flex items-center px-4 py-2 text-white rounded-[10px] hover:bg-[#7E22CE]">
                                                <span className="mr-2"></span><BiBadgeCheck />
                                                Add Slider


                                            </div>
                                        </Link>

                                    </li>
                                    <li>

                                        <Link to={"/ViewSlider"}>

                                            <div className="flex items-center px-4 py-2 text-white rounded-[10px] hover:bg-[#7E22CE]">
                                                <span className="mr-2"></span><BiBadgeCheck />
                                                View Slider
                                            </div>
                                        </Link>

                                    </li>

                                </ul>

                            </div>

                        </li>
                        <li>
                            <div className="flex items-center px-4 py-2 text-white rounded-[10px] hover:bg-[#7E22CE]"  onClick={() => setCountry(prev => !prev)}>
                                <span className="mr-2">🌍</span>
                                Country
                            </div>
                            <div className={`${Country ? " block" : " hidden"}`}>
                                <ul >
                                    <li>

                                        <Link to={"/Add_Country"}>

                                            <div className="flex items-center px-4 py-2 text-white rounded-[10px] hover:bg-[#7E22CE]">
                                                <span className="mr-2"></span><BiBadgeCheck />
                                                Add Country


                                            </div>
                                        </Link>

                                    </li>
                                    <li>

                                        <Link to={"/ViewCountry"}>

                                            <div className="flex items-center px-4 py-2 text-white rounded-[10px] hover:bg-[#7E22CE]">
                                                <span className="mr-2"></span><BiBadgeCheck />
                                                View Country
                                            </div>
                                        </Link>

                                    </li>

                                </ul>

                            </div>

                        </li>
                        <li>
                            <div className="flex items-center px-4 py-2 text-white rounded-[10px] hover:bg-[#7E22CE]"  onClick={() => setTestimonials(prev => !prev)}>
                                <span className="mr-2">💬</span>
                                Testimonials
                            </div>
                            <div className={`${Testimonials ? " block" : " hidden"}`}>
                                <ul >
                                    <li>

                                        <Link to={"/Add_Testimonial"}>

                                            <div className="flex items-center px-4 py-2 rounded-[10px] text-white hover:bg-[#7E22CE]" >
                                                <span className="mr-2"></span><BiBadgeCheck />
                                                Add Testimonial



                                            </div>
                                        </Link>

                                    </li>
                                    <li>

                                        <Link to={"/Viewtestimonial"}>

                                            <div className="flex items-center px-4 py-2 text-white rounded-[10px] hover:bg-[#7E22CE]">
                                                <span className="mr-2"></span><BiBadgeCheck />
                                                View Testimonial
                                            </div>
                                        </Link>

                                    </li>

                                </ul>

                            </div>

                        </li>
                        <li>
                            <div className="flex items-center px-4 py-2 text-white rounded-[10px] hover:bg-[#7E22CE]"  onClick={() => setFAQs(prev => !prev)}>
                                <span className="mr-2">❓</span>
                                FAQs
                            </div>
                            <div className={`${FAQs ? " block" : " hidden"}`}>
                                <ul >
                                    <li>

                                        <Link to={"/Add_Faq"}>

                                            <div className="flex items-center px-4 py-2 rounded-[10px] text-white hover:bg-[#7E22CE]">
                                                <span className="mr-2"></span><BiBadgeCheck />
                                                Add Faq


                                            </div>
                                        </Link>

                                    </li>
                                    <li>

                                        <Link to={"/ViewFaq"}>

                                            <div className="flex items-center px-4 py-2 rounded-[10px] text-white hover:bg-[#7E22CE]">
                                                <span className="mr-2"></span><BiBadgeCheck />
                                                View Faq
                                            </div>
                                        </Link>

                                    </li>

                                </ul>

                            </div>

                        </li>
                        <li>
                            <div className="flex items-center px-4 py-2 text-white rounded-[10px] hover:bg-[#7E22CE]">
                                <span className="mr-2">📄</span>
                                Terms & Conditions
                            </div>


                        </li>
                    </ul>
                </nav>
            </div>

        </div>
    )
}
