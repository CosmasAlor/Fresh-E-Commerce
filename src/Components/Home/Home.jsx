// eslint-disable-next-line no-unused-vars
import React, { useEffect, useContext } from 'react';
import Products from '../Products/Products';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';
import { CartContext } from '../../Context/CartContext'; // Importing the context
import { WishlistContext } from '../../Context/WishListContext';

export default function Home() {
  const { getCart } = useContext(CartContext); // Accessing getCart from the context
  const { getWishlist } = useContext(WishlistContext); // Accessing getCart from the context

  useEffect(() => {
    getCart();
    getWishlist() // Call getCart when the component mounts
  }, []);

  return (
    <>
      <MainSlider />
      <CategorySlider />
      <Products />
    </>
  );
}
