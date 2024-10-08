import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout.jsx';
import Home from './Components/Home/Home.jsx';
import Cart from './Components/Cart/Cart.jsx';
import AllProducts from './Components/AllProducts/AllProducts.jsx';
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx';
import Categories from './Components/Categories/Categories.jsx';
import Checkout from './Components/Checkout/Checkout.jsx';
import Allorders from './Components/Allorders/Allorders.jsx';
import Brands from './Components/Brands/Brands.jsx';
import Login from './Components/Login/Login.jsx';
import Register from './Components/Register/Register.jsx';
import Notfound from './Components/Notfound/Notfound.jsx';
import UserContextProvider from './Context/UserContext.jsx';
import ProtectRoute from './Components/ProtectRoute/ProtectRoute.jsx';
import CartContextProvider, { CartContext } from './Context/CartContext.jsx';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import WishList from './Components/WishList/WishList.jsx';
import WishlistContextProvider from './Context/WishListContext.jsx';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword.jsx';
import VerifyCode from './Components/Verify-Code/Verify-Code.jsx';
import ResetPassword from './Components/Reset-Password/Reset-Password.jsx';

const router = createBrowserRouter([
  {
    path: '/', // Corrected root path
    element: <Layout />,
    children: [
      { index: true, element: <ProtectRoute><Home /></ProtectRoute> },
      { path: 'cart', element: <ProtectRoute><Cart /></ProtectRoute> },
      { path: 'wishlist', element: <ProtectRoute><WishList /></ProtectRoute> },
      { path: 'Allproducts', element: <ProtectRoute><AllProducts /></ProtectRoute> },
      { path: 'productsdetails/:id', element: <ProtectRoute><ProductDetails /></ProtectRoute> },
      { path: 'categories', element: <ProtectRoute><Categories /></ProtectRoute> },
      { path: 'checkout', element: <ProtectRoute><Checkout /></ProtectRoute> },
      { path: 'categories', element: <ProtectRoute><Categories /></ProtectRoute> },
      { path: 'allorders', element: <ProtectRoute><Allorders /></ProtectRoute> },
      { path: 'brands', element: <ProtectRoute><Brands /></ProtectRoute> },
      { path: 'login', element: <Login /> },
      { path: 'ForgetPassword', element: <ForgetPassword /> },
      { path: 'verify-code', element: <VerifyCode /> },
      { path: 'reset-password', element: <ResetPassword /> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <Notfound /> },
    ],
  },
]);

let query = new QueryClient()

function App() {
  return (
        <QueryClientProvider client={query}>
            <WishlistContextProvider>
              <CartContextProvider>
                <UserContextProvider>
                    <RouterProvider router={router} />
                    <Toaster />
                    <ReactQueryDevtools></ReactQueryDevtools>
                </UserContextProvider>
              </CartContextProvider>
            </WishlistContextProvider>
        </QueryClientProvider>
  );
}

export default App;
