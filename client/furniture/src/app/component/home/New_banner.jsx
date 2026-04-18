import React from 'react'

export default function New_banner() {
  return (
    <>
      <div className='relative mt-5 overflow-hidden'>
        {/* Banner Image Container */}
        <div className='w-full h-[400px] md:h-[500px] lg:h-[600px]'>
          <img 
            src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/e9234fa4-3ff6-4a6e-a00e-0c9ff26e7b20-1670180400.jpg" 
            className='w-full h-full object-cover object-center' 
            alt="New Trending Collection" 
          />
        </div>

        {/* Text Overlay Section */}
        <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center px-6 md:px-[100px]'>
          <div className='max-w-[600px] duration-200 hover:scale-105 transition-transform'>
            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[cha] pb-3 md:pb-5 leading-tight'>
              New Trending Collection
            </h1>
            
            <p className='text-sm md:text-base lg:text-lg pb-10 md:pb-[60px] lg:pb-[100px] text-gray-700'>
              We Believe That Good Design is Always in Season
            </p>
            
            <div>
              <button className='px-6 md:px-10 border-2 py-2 md:py-3 text-[#C09578] border-[#C09578] duration-200 hover:bg-[#C09578] hover:text-white uppercase text-xs md:text-sm font-bold tracking-widest'>
                Shopping Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}