import React, { useContext } from 'react';
import style from './Navbar.module.css';
import logo from '../../assets/images/freshcart-logo.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';

export default function Navbar() {

  let { userData, setUserData } = useContext(UserContext);
  let { cart } = useContext(CartContext);
  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('/Login');
  }

  return (
    <>
      <nav className='bg-gray-200  md:fixed top-0 inset-x-0 py-2 text-center capitalize'>
        <div className="container flex flex-col md:flex-row justify-between items-center text-gray-500">
          <div className='flex flex-col md:flex-row space-x-3'>
            <img src={logo} width={120} alt="" />

            {userData && (
              <ul className='flex flex-col md:flex-row space-x-2'>
                <li><NavLink to="">Home</NavLink></li>
                <li><NavLink to="Allproducts">Products</NavLink></li>
                <li><NavLink to="categories">Categories</NavLink></li>
                <li><NavLink to="brands">Brands</NavLink></li>
              </ul>
            )}
          </div>

          <div className=''>
            <ul className='flex flex-col md:flex-row space-x-2'>
            
              {userData ? (<>
              
                <li className='relative'><NavLink to="cart"><i className='fa-solid text-3xl text-main fa-cart-shopping'></i></NavLink>
                  <span className='text-white absolute left-1/2 top-[-2px]'>
                    {cart ? cart.numOfCartItems : 0} {/* Display 0 if cart is null */}
                  </span>
                </li>
                <li><span onClick={logOut} className='cursor-pointer'>Logout</span></li>
              </>

              ) : (
                <>
                  <li><NavLink to="login">Login</NavLink></li>
                  <li><NavLink to="register">Register</NavLink></li>
                </>
              )}

              <li className='space-x-2 text-black'>
                <i className='fab fa-facebook-f'></i>
                <i className='fab fa-linkedin-in'></i>
                <i className='fab fa-youtube'></i>
                <i className='fab fa-twitter'></i>
                <i className='fab fa-instagram'></i>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
