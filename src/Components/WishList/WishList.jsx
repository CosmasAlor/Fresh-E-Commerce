import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishListContext';
import Loading from '../Loading/Loading';

export default function WishList() {
  const { getCart, addProductToCart } = useContext(CartContext);
  const { getWishlist, wishlist = [], removeFromWishlist } = useContext(WishlistContext);
  const [loading, setLoading] = useState(false); // State to manage loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getCart();
        await getWishlist();
      } catch (error) {
        console.error('Error fetching data:', error);
        // Optionally, handle the error state here
      }
    };
    fetchData();
  }, [getCart, getWishlist]);


  const handleRemove = async (id) => {
    setLoading(true); // Set loading to true when starting the remove action
    try {
      await removeFromWishlist(id);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      // Optionally, handle the error state here
    } finally {
      setLoading(false); // Set loading to false when the action completes
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (!wishlist || !wishlist.data) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (wishlist.data.length === 0) {
    return (
      <div className="text-center mt-8">
        <h1 className="text-3xl">WishList</h1>
        <p className="text-xl mt-4">Your wishlist is empty.</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl text-center mt-8">WishList</h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-3/4 mx-auto mt-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th className="px-6 py-3 text-center">Price</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {wishlist.data.map((product) => (
              <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4">
                  <img src={product.imageCover} className="md:w-32 max-w-full max-h-full" alt={`Product image for ${product.name}`} />
                </td>
                <td className="px-6 py-4 font-semibold text-center text-gray-900 dark:text-white">
                  {product.price} EG
                </td>
                <td className="px-6 py-4 text-center">
                  <button 
                    onClick={() => handleRemove(product.id)} 
                    className="bg-yellow-300 text-black p-2 rounded-md"
                  >
                    Remove
                  </button>
                  <button 
                    onClick={() => addProductToCart(product.id)} 
                    className="bg-main text-black p-2 rounded-md ml-2"
                  >
                    Add To Cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
