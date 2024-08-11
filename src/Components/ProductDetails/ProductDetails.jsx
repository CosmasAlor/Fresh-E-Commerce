import React, { useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function ProductDetails() {

  let {id} =  useParams()
  const [productDetails, setProductDetails] = useState({})


  async function getProductsDetails(id) {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  
    console.log(data);
    setProductDetails (data.data)
    
  
  }

useEffect(()=> {
  getProductsDetails(id)
} , [])
    
  return <>
    
    <h1 className="text-3xl">ProductDetails</h1>


    <div className="flex items-center py-10">
      <div className="w-1/4">
        <img src={productDetails.imageCover} alt="" className='w-full' />
      </div>
      <div className="w-3/4 mx-10">
        <div>
          <h2>{productDetails.title}</h2>
          <p className='my-6 text-gray-500'>{productDetails.description}</p>
        </div>
        <h2 className='text-main text-sm'>{productDetails.category?.name}</h2>
        <div className="flex justify-between my-2">
        <h3>{productDetails.price} EGP</h3>
        <h3><i className='fas fa-star rating-color'></i> {productDetails.ratingsAverage}</h3>
      </div>

         <div className="btn w-full bg-main text-white rounded py-1 px-3 cursor-pointer">
          Add To Card
        </div>
      </div>
    </div>
  
  </>
}
