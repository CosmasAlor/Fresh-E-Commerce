import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishListContext';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

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
<div className="">
<h1 className="text-3xl mt-8">My WishList</h1>

<div className="relative overflow-x-auto  sm:rounded-lg w-3/4 mx-auto mt-4">


{wishlist.data.map((product) => (
  // eslint-disable-next-line react/jsx-key
  <div key={product.id} className="m-2">
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm ">
            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
              <a href="#" className="shrink-0 md:order-1">
                <img src={product.imageCover} className="md:w-32 max-w-full max-h-full" alt={`Product image for ${product.name}`} />
              
              </a>

              <div className="flex items-center justify-between md:order-3 md:justify-end">
                <div className="flex items-center">
                <button 
              onClick={() => handleRemove(product.id)} 
              className="bg-yellow-300 text-black p-2 rounded-md"
            >
              Remove
            </button>
                </div>
                <div className="text-end md:order-4 md:w-32">
                <button 
              onClick={() => addProductToCart(product.id)} 
              className="bg-main text-black p-2 rounded-md ml-2"
            >
              Add To Cart
            </button>
                </div>
              </div>

              <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                <p  className="text-base font-medium text-gray-900 hover:underline dark:text-white">
                {product.title}
                </p>
                <div className="flex items-center gap-4">
                  <h2> {product.price} EG</h2>
                </div>
              </div>
            </div>
          </div>
 </div>

))}

</div>
</div>
    </>
  );
}
