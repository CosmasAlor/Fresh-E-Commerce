import React, { useEffect, useContext } from 'react';
import style from './Home.module.css'; // Ensure your CSS file has the relevant styles
import Products from '../Products/Products';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';
import { CartContext } from '../../Context/CartContext'; // Importing the context

export default function Home() {
  const { getCart } = useContext(CartContext); // Accessing getCart from the context

  useEffect(() => {
    getCart(); // Call getCart when the component mounts
  }, []);

  return (
    <>
      <MainSlider />
      <CategorySlider />
      <Products />
    </>
  );
}
