import '../App.css'
import React from 'react'
import imageOne from '../assets/images/hero-image-one.jpg'
import imageTwo from '../assets/images/hero-image-two.jpg'
import imageThree from '../assets/images/hero-image-three.jpg'
import imageFour from '../assets/images/hero-image-four.jpg'
import imageFive from '../assets/images/hero-image-five.jpg'
import imageSix from '../assets/images/hero-image-six.jpg'
import prototypeimage from '../assets/images/prototype.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Home() {

    const [query, setQuery] = useState('');
    const navigate = useNavigate();  // React Router hook to navigate to another page
  
    // Handle search when the Enter key is pressed
    const handleKeyPress = (event) => {
      if (event.key === 'Enter' && query.trim()) {
        navigate(`/search/${query}`);  // Navigate to the search results page with the query
      }
    };
  
   
  return (
    <>
      <main className='bg-[#FFA52F] h-auto pb-24'>
        <header className='bg-[#FFA52F] p-9 pb-16 md:p-40 md:pb-16 lg:pb-16 lg:p-40 pt-48 md:pt-32 lg:pt-32'>
        <h1 className='hidden md:block lg:block  text-4xl md:text-5xl lg:text-5xl font-globalBold md:text-center lg:text-center mb-7'>Your No. 1 <span className='font-primary text-[#046325]'>Food Recipe</span>
        <br/> app for culinary
        <br/> Inspirations.</h1>

        {/******Mobile Display******/}
        <h1 className='md:hidden lg:hidden text-4xl md:text-5xl lg:text-5xl font-globalBold md:text-center lg:text-center mb-7'>Your No. 1 <br/><span className='font-primary text-[#046325]'>Food Recipe</span>
        <br/> app for culinary
        <br/> Inspirations.</h1>

        <p className='hidden md:block lg:block text-xl font-globalBold md:text-center lg:text-center mb-10'>Explore thousands of recipes <br/> for every craving and occasion.</p>
        {/******Mobile Display******/}
        <p className='md:hidden lg:hidden text-md font-globalBold md:text-center lg:text-center mb-10'>Explore thousands of recipes <br/> for every craving and occasion.</p>
        
        <div className='flex gap-5 bg-white p-3 md:p-5 lg:p-5 rounded-full border-none outline-none text-md font-global'>
        <FontAwesomeIcon icon={faSearch} className='h-5 text-[#FFA52F]' />
        <input type="search" id='search' className='w-full h-full outline-none' value={query}
        onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyPress} placeholder='Search here for recipes...' />
        </div>
        </header>

        <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
       
        <div className="flex ml-16 mr-16 space-x-4 w-max">
          {/* Item 1 */}
          <img src={imageOne} alt="" className='cursor-pointer rounded-3xl h-48 md:h-64 w-auto' />
          {/* Item 2 */}
          <img src={imageTwo} alt="" className='cursor-pointer rounded-3xl h-48 md:h-64 w-auto' />
          {/* Item 3 */}
          <img src={imageThree} alt="" className='cursor-pointer rounded-3xl h-48 md:h-64 w-auto' />
          {/* Item 4 */}
          <img src={imageFour} alt="" className='cursor-pointer rounded-3xl h-48 md:h-64 w-auto' />
           {/* Item 5 */}
           <img src={imageFive} alt="" className='cursor-pointer rounded-3xl h-48 md:h-64 w-auto' />
            {/* Item 6 */}
          <img src={imageSix} alt="" className='cursor-pointer rounded-3xl h-48 md:h-64 w-auto' />
          
        </div>
      </div>
      </main>

      <section id='about' className='p-9 md:p-16 lg:p-40'>
        <div className='grid md:grid-cols-2 lg:grid-cols-2 gap-5'>
            <div>
              <h1 className='text-[#FFA52F] font-globalBold  mt-14'>TOP RECIPE BOOK</h1>
              <h1 className='text-3xl md:text-3xl lg:text-4xl font-globalBold align-middle mb-7'>Have you tried the Mobile Version? It looks much better 😊.</h1>
              <h1 className='font-global'>Our recipe app is your ultimate kitchen companion, designed to make cooking simple, enjoyable, and inspiring. 
                Whether you're a seasoned chef or just starting your culinary journey, 
                this app offers an endless array of recipes to suit every taste and occasion.</h1>
            </div>
            <img src={prototypeimage} alt="" />
        </div>

      </section>
    </>
  )
}

export default Home
