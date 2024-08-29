import React, { useContext } from 'react';
import style from './Products.module.css'; // Ensure this file contains relevant styles
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishListContext';
import Loading from '../Loading/Loading';
import useProducts from '../../Hooks/useProducts';

export default function Products() {
  const { data, isLoading } = useProducts();
  const { addProductToCart } = useContext(CartContext);
  const { addWishlist , wishlist} = useContext(WishlistContext);

  console.log(wishlist.data);
  
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
    <div
      key={product.id}
      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 m-2"
    >
      <Link to={`productsdetails/${product.id}`}>
        <div className="h-56 w-full mb-4">
          <img
            src={product.imageCover}
            alt={product.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <h2 className="text-main text-sm">{product.category.name}</h2>
        <h2 className="font-medium">{product.title.split(' ').slice(0, 2).join(' ')}</h2>
      </Link>

      <div className="flex justify-between my-2 items-center">
        <h3 className="text-xl font-semibold">{product.price} EGP</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => addWishlist(product.id)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
          >
            <i className="fa-regular fa-heart fa-2x"></i>
          </button>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {product.ratingsAverage}
          </p>
          <div className="flex items-center">
            <i className="fas fa-star rating-color"></i>
          </div>
        </div>
      </div>

      <button
        className="w-full bg-main text-white rounded py-1 px-3 mt-2 hover:bg-main-dark focus:outline-none focus:ring-4 focus:ring-main-dark"
        onClick={() => addProductToCart(product.id)}
      >
        Add To Cart
      </button>
    </div>
  ))}
</div>

    </>
  );
}
