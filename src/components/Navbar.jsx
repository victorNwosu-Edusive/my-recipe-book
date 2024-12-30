import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../assets/images/logo.png'
import React, { useState } from 'react';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import { NavLink, Outlet } from 'react-router-dom';
import { useUser } from "../UserContext";

function Navbar() {

  const { user, setUser } = useUser(); // Access user and setUser from context
  const [showModal, setShowModal] = useState(false);

  // Handle guest login
  const loginAsGuest = () => {
    setUser({ name: 'Guest', role: 'guest' });
    setShowModal(false); // Close the modal after login
  };

  // Handle logout
  const logout = () => {
    setUser(null);
  };


  const [isOpen, setIsOpen] = useState(false);
    
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
      setIsOpen(false);
    };
   
    return (
      <>
      {/*The Navigation Bar (Responsive)*/}
      <header className='*:font-global'>
      <nav className='fixed z-30 w-full lg:w-full bg-[#FFA52F]/75 backdrop-blur-md p-4 pt-8 flex flex-wrap justify-between items-center mx-auto max-w-screen-3xl'>
      {/*The Navigation Logo*/}    
          <div className='flex space-x-3 rtl:space-x-reverse'>
            <NavLink to="/" className='font-heading duration-300'>
            <img src={logo} alt="" className="h-7 w-auto ml-7"  />
            </NavLink>
          </div>

          <div className='md:hidden lg:hidden flex flex-wrap gap-6'>
          {user ? (
              <div className="flex items-center space-x-2">
                <button onClick={logout} className="text-black hover:text-[#FFA52F] rounded-xl text-sm p-2 duration-300 hover:bg-black flex gap-1 font-bold">Logout<div className='cursor-pointer hover:bg-black rounded-full px-1 border-[1px] bg-green-900 border-solid'><p className='text-[12px] font-global text-white m-auto font-bold'>G</p></div></button>
              </div>
            ) : (
              <FontAwesomeIcon onClick={() => setShowModal(true)} icon={faCircleUser} className='h-7 cursor-pointer hover:bg-black rounded-full p-1 hover:text-[#FFA52F]' />
            )}
            

          {/*The Menu Icon to Mobile menu*/}
          <div className="md:hidden lg:hidden" onClick={toggleMenu}>
            <button className="text-white focus:outline-none relative scale-x-[-1] w-6 h-6">
              <span
                className={`block absolute w-8 h-0.5 bg-black transition-transform duration-300 ${
                  isOpen ? 'rotate-12 bg-black' : '-translate-y-1.5'
                }`}
              ></span>
              <span
                className={`block absolute w-8 h-0.5 bg-black transition-opacity duration-300 ${
                  isOpen ? 'opacity-0 bg-black' : 'opacity-100'
                }`}
              ></span>
              <span
                className={`block absolute w-8 h-0.5 bg-black transition-transform duration-300 ${
                  isOpen ? '-rotate-12 bg-black' : 'translate-y-1.5'
                }`}
              ></span>
            </button>
          </div>
          </div>

          <div className='hidden md:flex lg:flex  space-x-6 *:text-sm  font-bold'>
            <NavLink to="/categories" className="hover:text-[#FFA52F] hover:bg-black duration-300 rounded-md p-3">categories</NavLink>
            <NavLink to="/favorites" className="hover:text-[#FFA52F] hover:bg-black duration-300 rounded-md p-3">favorites</NavLink>
            <a href="/#about" className="hover:text-[#FFA52F] hover:bg-black duration-300 rounded-md p-3">about</a>
          </div>

          {/* Login/Logout Section */}
          <div className="hidden md:flex lg:flex space-x-6 *:text-sm font-bold p-3 duration-300">
            {user ? (
              <div className="flex items-center space-x-2">
                <span>Welcome, {user.name}!</span>
                <button onClick={logout} className="text-black hover:text-[#FFA52F] rounded-xl p-2 duration-300 hover:bg-black">Logout</button>
              </div>
            ) : (
              <button
                onClick={() => setShowModal(true)}
                className="*:text-black *:hover:text-[#FFA52F] hover:bg-black p-2 rounded-xl duration-300 flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faCircleUser} />
                <span>Login</span>
              </button>
            )}
          </div>
        </nav>
      </header>

      {/*The Navigation Links for Mobile Menu (Navigation)*/}
      <div id="mobile" className={`${
          isOpen ? "left-0" : "left-full"
            } lg:hidden fixed grid duration-300 ease-out gap-4 text-left z-20 text-black font-global text-md overflow-y-scroll h-auto w-full p-3 px-6 pb-96 pt-40 bg-[#FFA52F]/90 backdrop-blur-md mx-auto max-w-screen-xl `}>
          <NavLink to="/categories" className="md:block bg-yellow-900/5 p-3 hover:text-[#FFA52F] rounded-md hover:bg-black duration-300 " onClick={closeMenu} title="categories">categories </NavLink>
          <NavLink to="/favorites" className="md:block  bg-yellow-900/5 p-3 hover:text-[#FFA52F] rounded-md  hover:bg-black duration-300 " onClick={closeMenu} title='favorites'>favorites</NavLink>
          <a href="/#about" className="md:block  bg-yellow-900/5 p-3 hover:text-[#FFA52F] rounded-md  hover:bg-black duration-300 " onClick={closeMenu} title='about'>about</a>
          
        </div>

      {/* Login Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 font-global text-center">Login</h2>
            <div className="space-y-4">
              <button
                onClick={loginAsGuest}
                className="w-full bg-[#FFA52F] font-global text-white py-2 px-4 rounded-md hover:bg-black hover:text-[#FFA52F] transition duration-300"
              >
                Login as Guest
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-gray-200 font-global text-black py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}


      <Outlet />
  
          
          
          
      </>
    )
  }
  
  export default Navbar
  