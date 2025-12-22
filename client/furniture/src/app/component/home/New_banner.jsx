import React from 'react'

export default function New_banner() {
  return (
    <>
      <div className=' relative mt-5  '>
         <div className='w-full h-[500px]' >
            <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/e9234fa4-3ff6-4a6e-a00e-0c9ff26e7b20-1670180400.jpg" className=' object-center h-full' alt="" />
        </div>
        <div className=' absolute top-[30%] left-[100px] duration-200 hover:scale-105'>
            <div><h1 className='text-6xl font-[cha] pb-5'>New Trending Collection</h1></div>
            <div><p className='pb-[120px]'>We Believe That Good Design is Always in Season</p></div>
            <div><button className='  px-10 border-2 py-3 text-[#C09578] border-[#C09578] duration-200 hover:bg-[#C09578] hover:text-white'>shopping Now</button></div>
        </div>
      


      </div>
       
    </>
  )
}
