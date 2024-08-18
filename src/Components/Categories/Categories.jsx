import React, { useContext, useEffect, useState } from 'react'
import style from './Categories.module.css'
import { CartContext } from '../../Context/CartContext';

export default function Categories() {
  const { getCart } = useContext(CartContext); // Accessing getCart from the context

  useEffect(() => {
    getCart(); // Call getCart when the component mounts
  }, [getCart]);


    
  return <>
    
    <h1 className="text-3xl">Categories</h1>
  
  </>
}
