import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'


function Categories() {

  return (
    <>
    <div className=" p-9 pt-40 md:p-40 lg:p-40 bg-[#FFF5E8] h-lvh">
    <h1 className="font-global text-2xl md:text-4xl lg:text-4xl mb-6">Categories</h1>
    <div className='flex gap-5 bg-white p-3 md:p-5 lg:p-5 rounded-full border-none outline-none text-md font-global'>
        <FontAwesomeIcon icon={faSearch} className='h-5 text-[#FFA52F]' />
        <input type="search" id='search' className='w-full h-full outline-none' placeholder='Search Categories...' />
        </div>
    </div>
    </>
  )
}

export default Categories
