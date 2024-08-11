import React, { useEffect, useContext } from 'react';
import style from './Layout.module.css';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext.jsx';

export default function Layout() {
  // Use the useContext hook to access UserContext values
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      setUserData(localStorage.getItem('userToken'));
    } 
  }, [navigate, setUserData]);

  return (
    <>
      <Navbar />
      <div className="container md:pt-12">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
