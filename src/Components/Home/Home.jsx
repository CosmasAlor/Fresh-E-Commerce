import React, { useEffect, useState } from 'react'
import style from './Home.module.css'
import Products from '../Products/Products';
import axios from 'axios'

export default function Home() {
const [products, setProducts] = useState([])


  async function getRecentProducts() {
    try {
      let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);

      console.log(data?.data);
      setProducts(data.data)
    } catch (error) {
      console.log(error);
      
    }
    
  }

useEffect(()=> {

  getRecentProducts()
}, []);
    
  return <>
    
    <h1 className="text-3xl py-5">Recent Products</h1>

    <div className="flex flex-wrap justify-center">
      {products.map((product , index)=> <Products key={index} product={product}/>)}
    </div>
  
  </>
}
