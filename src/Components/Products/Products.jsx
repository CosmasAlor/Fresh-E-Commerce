
import React, { useContext } from 'react';
import style from './Products.module.css'; // Ensure this file contains relevant styles
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';

import Loading from '../Loading/Loading';
import useProducts from '../../Hooks/useProducts';
import { WishlistContext } from '../../Context/WishListContext';

export default function Products() {

  const { data, isLoading } = useProducts()
  const { addProductToCart } = useContext(CartContext);
  const { addWishlist } = useContext(WishlistContext);



  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl py-5">Recent Products</h1>

      <div className="flex flex-wrap justify-center">
        {data.map((product) => (
          <div key={product.id} className="w-1/5 product p-2 gy-">
            <Link to={`productsdetails/${product.id}`}>
              <img src={product.imageCover} alt={product.title} className="w-full" />
              <h2 className='text-main text-sm'>{product.category.name}</h2>
              <h2 className='font-medium'>{product.title.split(' ').slice(0, 2).join(' ')}</h2>

            </Link>
            
            <div className="flex justify-between my-2">
                <h3>{product.price} EGP</h3>
                <div className="flex">
                  <h3><i onClick={() => addWishlist(product.id)} className='fa-regular fa-heart fa-2x px-2'></i> {product.ratingsAverage}</h3>
                  <h3><i className='fas fa-star rating-color '></i> </h3>
                </div>
              </div>
            <div className="btn w-full bg-main text-white rounded py-1 px-3" onClick={() => addProductToCart(product.id)}>
              Add To Cart
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
