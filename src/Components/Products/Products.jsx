import React from 'react';
import style from './Products.module.css'; // Ensure this file contains relevant styles
import { Link } from 'react-router-dom';


export default function Products({ product }) {
  return <>
    
    <div className="w-1/6 product p-2 gy-"> 
<Link to={`productsdetails/${product.id}`}>
<img src={product.imageCover} alt={product.title} className="w-full" />
      <h2 className='text-main text-sm'>{product.category.name}</h2>
      <h2 className='font-medium'>{product.title.split(' ').slice(0,2).join(' ')}</h2>
      <div className="flex justify-between my-2">
        <h3>{product.price} EGP</h3>
        <h3><i className='fas fa-star rating-color'></i> {product.ratingsAverage}</h3>
      </div>
</Link>



      <div className="btn w-full bg-main text-white rounded py-1 px-3">
        Add To Card
      </div>
    </div>
  
  
  
  </>



}
