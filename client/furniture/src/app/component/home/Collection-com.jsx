import React from 'react'

export default function Collection() {
    return (
        <div className='max-w-[1370px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 gap-8'>
            
            {/* Item 1 */}
            <div className='group relative overflow-hidden rounded-lg'>
                <img 
                    src="/124ad5ba-005d-4b47-a707-a9a87033833a-1670180400.webp" 
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' 
                    alt="Chair Collection" 
                />
                <div className='absolute top-0 left-0 bg-black/30 w-full h-full p-6 flex flex-col justify-start text-white'>
                    <p className='text-sm uppercase tracking-widest'>Design Creative</p>
                    <h2 className='text-[24px] md:text-[27px] font-[cha] font-semibold'>Chair Collection</h2>
                    <button className='mt-4 w-fit border-b border-white text-sm hover:text-[#c09578] hover:border-[#c09578] transition-colors'>
                        SHOP NOW
                    </button>
                </div>
            </div>

            {/* Item 2 */}
            <div className='group relative overflow-hidden rounded-lg'>
                <img 
                    src="/0d588bec-d9a0-4645-8e7a-b49ef67b34be-1670180400.webp" 
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' 
                    alt="Chair Collection" 
                />
                <div className='absolute top-0 left-0 bg-black/30 w-full h-full p-6 flex flex-col justify-start text-white'>
                    <p className='text-sm uppercase tracking-widest'>Design Creative</p>
                    <h2 className='text-[24px] md:text-[27px] font-[cha] font-semibold'>Chair Collection</h2>
                    <button className='mt-4 w-fit border-b border-white text-sm hover:text-[#c09578] hover:border-[#c09578] transition-colors'>
                        SHOP NOW
                    </button>
                </div>
            </div>

            {/* Item 3 */}
            <div className='group relative overflow-hidden rounded-lg'>
                <img 
                    src="/124ad5ba-005d-4b47-a707-a9a87033833a-1670180400.webp" 
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' 
                    alt="Chair Collection" 
                />
                <div className='absolute top-0 left-0 bg-black/30 w-full h-full p-6 flex flex-col justify-start text-white'>
                    <p className='text-sm uppercase tracking-widest'>Design Creative</p>
                    <h2 className='text-[24px] md:text-[27px] font-[cha] font-semibold'>Chair Collection</h2>
                    <button className='mt-4 w-fit border-b border-white text-sm hover:text-[#c09578] hover:border-[#c09578] transition-colors'>
                        SHOP NOW
                    </button>
                </div>
            </div>

        </div>
    )
}