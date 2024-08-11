import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout.jsx';
import Home from './Components/Home/Home.jsx';
import Cart from './Components/Cart/Cart.jsx';
import Products from './Components/Products/Products.jsx';
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx';
import Categories from './Components/Categories/Categories.jsx';
import Brands from './Components/Brands/Brands.jsx';
import Login from './Components/Login/Login.jsx';
import Register from './Components/Register/Register.jsx';
import Notfound from './Components/Notfound/Notfound.jsx';
import CounterContextProvider from './Context/CounterContext.jsx';
import UserContextProvider from './Context/UserContext.jsx';
import ProtectRoute from './Components/ProtectRoute/ProtectRoute.jsx';

const router = createBrowserRouter([
  {
    path: '/', // Corrected root path
    element: <Layout />,
    children: [
      { index: true, element: <ProtectRoute><Home /></ProtectRoute> },
      { path: 'cart', element: <ProtectRoute><Cart /></ProtectRoute> },
      { path: 'products', element: <ProtectRoute><Products /></ProtectRoute> },
      { path: 'productsdetails/:id', element: <ProtectRoute><ProductDetails /></ProtectRoute> },
      { path: 'categories', element: <ProtectRoute><Categories /></ProtectRoute> },
      { path: 'brands', element: <ProtectRoute><Brands /></ProtectRoute> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    <UserContextProvider>
      <CounterContextProvider>
        <RouterProvider router={router} />
      </CounterContextProvider>
    </UserContextProvider>
  );
}

export default App;
