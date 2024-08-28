import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import useProducts from '../../Hooks/useProducts';
import { WishlistContext } from '../../Context/WishListContext';

export default function Cart() {
  const { getCart, cart, updateProductCount, deleteProduct, addProductToCart } = useContext(CartContext);
  const { data } = useProducts();
  const { addWishlist } = useContext(WishlistContext);

  const shuffleArray = (array) => {
    let shuffled = [...array]; // Create a copy of the array using spread operator
    let currentIndex = shuffled.length;
    let randomIndex;
  
    // While there remain elements to shuffle
    while (currentIndex > 0) {
      // Pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // Swap with the current element
      [shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]];
    }
  
    return shuffled;
  };
  
  
  const shuffledData = data ? shuffleArray(data) : [];
  const displayedProducts = shuffledData.slice(0, 3);

  useEffect(() => {
    getCart();
  }, [getCart]);

  return (
    <>
      {!cart ? (
        <Loading />
      ) : (
        <section className="py-8 antialiased dark:bg-gray-900 md:py-16">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>

            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                <div className="space-y-6">
                  {cart.data.products.length > 0 ? (
                    cart.data.products.map((product) => (
                      <div key={product.product.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                          <img className="h-20 w-50" src={product.product.imageCover} alt={product.product.title} />
                          <div className="flex items-center justify-between md:order-3 md:justify-end">
                            <div className="flex items-center">
                              <button type="button" onClick={() => updateProductCount(product.product.id, product.count - 1)}
                                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                </svg>
                              </button>
                              <span className='p-3'> {product.count} </span>
                              <button type="button" onClick={() => updateProductCount(product.product.id, product.count + 1)}
                                className="inline-flex items-center justify-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                </svg>
                              </button>
                            </div>
                            <div className="text-end md:order-4 md:w-32">
                              <p className="text-base font-bold text-gray-900 dark:text-white">{product.price} EG</p>
                            </div>
                          </div>
                          <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                            <Link to="#" className="text-base font-medium text-gray-900 hover:underline dark:text-white">{product.product.title}</Link>
                            <div className="flex items-center gap-4">
                              <button onClick={() => addWishlist(product.product.id)} type="button" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                                <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                </svg>
                                Add to Favorites
                              </button>
                              <button type="button" onClick={() => deleteProduct(product.product.id)} className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                                <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                </svg>
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Your cart is empty.</p>
                  )}
                </div>
                <div className="hidden xl:mt-8 xl:block">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">People also bought</h3>
                  <div className="mt-6 grid grid-cols-3 gap-4 sm:mt-8">
                    {displayedProducts.map((product) => (
                      <div key={product.id} className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <Link to="#" className="overflow-hidden rounded-lg">
                          <img className="object-cover h-48 w-full" src={product.imageCover} alt={product.title} />
                        </Link>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <p className="text-base font-bold text-gray-900 dark:text-white">{product.title.split(' ').slice(0, 2).join(' ')}</p>
                            <p className="text-base font-bold text-gray-900 dark:text-white">{product.price} EG</p>
                          </div>
                          
                          <div className="flex items-center gap-4 justify-between">
                          <button onClick={() => addWishlist(product.id)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
                            <i className='fa-regular fa-heart fa-2x'></i>
                          </button>
                          <button onClick={() => addProductToCart(product)} type="button" className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-main rounded-lg hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600">
                            Add to cart
                          </button>

                          </div>
   
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>


              <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
        <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

        <div className="space-y-4">
          <div className="space-y-2">
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
              <dd className="text-base font-medium text-gray-900 dark:text-white">{cart.data.totalCartPrice} EG</dd>
            </dl>


            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
              <dd className="text-base font-medium text-gray-900 dark:text-white">0 EG</dd>
            </dl>
          </div>

          <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
            <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
            <dd className="text-base font-bold text-gray-900 dark:text-white">{cart.data.totalCartPrice} EG</dd>
          </dl>
        </div>


        <Link to={'/Checkout'} className="bg-main flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-black hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Checkout </Link>
      
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>

          <Link to={'/allproducts'} className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"> Continue Shopping </Link>
        </div>
      </div>
    </div>



            </div>
          </div>
        </section>
      )}
    </>
  );
}
