import React, { useContext, useEffect, useState } from 'react'
import style from './Brands.module.css'
import { CartContext } from '../../Context/CartContext';

export default function Brands() {
  const { getCart } = useContext(CartContext); // Accessing getCart from the context

  useEffect(() => {
    getCart(); // Call getCart when the component mounts
  }, []);


    
  return <>
    
    <h1 className="text-3xl">Brands</h1>
  
  </>
}
