import React, { useContext, useState } from 'react';
import style from './Navbar.module.css';
import logo from '../../assets/images/freshcart-logo.svg';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';

export default function Navbar() {

  let { userData, setUserData } = useContext(UserContext);
  let { cart } = useContext(CartContext);
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State to handle menu visibility

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false); // Function to close the menu


  function logOut() {
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('/Login');
  }



//   <nav className='bg-gray-200  md:fixed top-0 inset-x-0 py-2 text-center capitalize z-50'>
//   <div className="container flex flex-col md:flex-row justify-between items-center text-gray-500">
//     <div className='flex flex-col md:flex-row space-x-3'>
//     <NavLink to="">
//        
//       </NavLink>
//       {userData && (
//         <ul className='flex flex-col md:flex-row space-x-2'>
//           <li><NavLink to="">Home</NavLink></li>
//           <li><NavLink to="Allproducts">Products</NavLink></li>
//           <li><NavLink to="categories">Categories</NavLink></li>
//           <li><NavLink to="brands">Brands</NavLink></li>
//           <li><NavLink to="wishlist">Wish List</NavLink></li>
//         </ul>
//       )}
//     </div>

//     <div className=''>
//       <ul className='flex flex-col md:flex-row space-x-2'>
    
//         <li className='space-x-2 text-black'>
//           <i className='fab fa-facebook-f'></i>
//           <i className='fab fa-linkedin-in'></i>
//           <i className='fab fa-youtube'></i>
//           <i className='fab fa-twitter'></i>
//           <i className='fab fa-instagram'></i>
//         </li>
//       </ul>
//     </div>
//   </div>
// </nav>
  return (
    <>

<nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-900 capitalize z-50 fixed top-0 w-full">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img src={logo} width={150} alt="Logo" />
        </NavLink>

        {/* Menu Toggle Button */}
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
          aria-label="Toggle menu"
        >
          <span className="sr-only">Open main menu</span>
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {/* Menu Container */}
        <div className={`lg:flex lg:items-center lg:justify-between w-full lg:w-auto ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu">
          {/* Navigation Links */}
          <ul className="flex flex-col lg:flex-row lg:space-x-8 mt-4 lg:mt-0 pr-4">
            <li>
              <NavLink to="/" onClick={closeMenu} aria-label="Home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/Allproducts" onClick={closeMenu} aria-label="Products">Products</NavLink>
            </li>
            <li>
              <NavLink to="/categories" onClick={closeMenu} aria-label="Categories">Categories</NavLink>
            </li>
            <li>
              <NavLink to="/brands" onClick={closeMenu} aria-label="Brands">Brands</NavLink>
            </li>
            <li>
              <NavLink to="/wishlist" onClick={closeMenu} aria-label="Wish List">Wish List</NavLink>
            </li>
          </ul>

          {/* User Actions */}
          <div className="flex items-center lg:ml-auto mt-4 lg:mt-0 space-x-2">
            {userData ? (
              <>
                <NavLink
                  to="/cart"
                  onClick={closeMenu}
                  className="inline-flex items-center text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2"
                  aria-label={`Cart (${cart ? cart.numOfCartItems : 0})`}
                >
                  <i className='fa-solid text-1xl text-main fa-cart-shopping'></i> {cart ? cart.numOfCartItems : 0}
                </NavLink>
                <span
                  onClick={() => { closeMenu(); logOut(); }}
                  className="inline-flex items-center text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 cursor-pointer"
                  aria-label="Logout"
                >
                  Logout
                </span>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={closeMenu}
                  className="inline-flex items-center text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2"
                  aria-label="Login"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={closeMenu}
                  className="inline-flex items-center text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2"
                  aria-label="Register"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>





      
    </>
  );
}
