import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";

export default function Desbord() {
    return (
        <div>
            <div className="min-h-screen bg-gray-100 ">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#5956D3] text-white h-[200px] rounded-lg shadow p-6">
                        <div className=' flex  items-center justify-between'>
                            <h2 className="text-xl font-bold mb-4">Users</h2>
                            <BsThreeDotsVertical />
                        </div>

                        <p className="text-3xl font-semibold">1,234</p>
                    </div>
                    <div className="bg-[#2998FE]  text-white h-[200px] rounded-lg shadow p-6">
                        <div className=' flex  items-center justify-between'>
                            <h2 className="text-xl font-bold mb-4">Product</h2>
                            <BsThreeDotsVertical />
                        </div>

                        <p className="text-3xl font-semibold">$45,678</p>
                    </div>
                    <div className="bg-[#FCB01E]  text-white h-[200px] rounded-lg shadow p-6">
                        <div className=' flex  items-center justify-between'>
                            <h2 className="text-xl font-bold mb-4">Category</h2>
                            <BsThreeDotsVertical />
                        </div>

                        <p className="text-3xl font-semibold">89</p>
                    </div>
                    <div className="bg-[#E95353]   text-white h-[200px] rounded-lg shadow p-6">

                        <div className=' flex  items-center justify-between'>
                            <h2 className="text-xl font-bold mb-4">Category</h2>
                            <BsThreeDotsVertical />
                        </div>

                        <p className="text-3xl font-semibold">89</p>
                    </div>
                </div>

            </div>
        </div>
    )
}
