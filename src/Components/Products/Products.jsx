// // eslint-disable-next-line no-unused-vars
// import React, { useContext, useState, useEffect } from 'react';
// import style from './Products.module.css'; // Ensure this file contains relevant styles
// import { Link } from 'react-router-dom';
// import { CartContext } from '../../Context/CartContext';
// import axios from 'axios'; // Ensure axios is imported
// import { useQuery } from '@tanstack/react-query';
// import Loading from '../Loading/Loading';



// export default function Products() {

//   function getRecentProducts() {
//     return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
//   }

//   let {data} = useQuery({
//     queryKey : ['recentProducts'],
//     queryFn  : getRecentProducts
//   })

//   console.log(data?.data.data);
  

//   const { addProductToCart } = useContext(CartContext);
//   const [loading, setLoading] = useState(true);
//   const [products, setProducts] = useState([]);

//   // async function getRecentProducts() {
//   //   try {
//   //     const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
//   //     setProducts(data.data);
//   //   } catch (error) {
//   //     console.log(error);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // }

//   // useEffect(() => {
//   //   getRecentProducts();
//   // }, []);

//   return (
//     <>
//       <h1 className="text-3xl py-5">Recent Products</h1>

//       {loading ? (
//         <div className="flex h-screen justify-center items-center">
//           {/* Replace <Loading /> with actual spinner or loading text */}
//           <div><Loading/></div>
//         </div>
//       ) : (
//         <div className="flex flex-wrap justify-center">
//           {data?.data.data.map((product) => (
//             <div key={product.id} className="w-1/6 product p-2 gy-">
//               <Link to={`productsdetails/${product.id}`}>
//                 <img src={product.imageCover} alt={product.title} className="w-full" />
//                 <h2 className='text-main text-sm'>{product.category.name}</h2>
//                 <h2 className='font-medium'>{product.title.split(' ').slice(0, 2).join(' ')}</h2>
//                 <div className="flex justify-between my-2">
//                   <h3>{product.price} EGP</h3>
//                   <h3><i className='fas fa-star rating-color'></i> {product.ratingsAverage}</h3>
//                 </div>
//               </Link>
//               <div className="btn w-full bg-main text-white rounded py-1 px-3" onClick={() => addProductToCart(product.id)}>
//                 Add To Cart
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   );
// }


import React, { useContext, useEffect } from 'react';
import style from './Products.module.css'; // Ensure this file contains relevant styles
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';
import useProducts from '../../Hooks/useProducts';

export default function Products() {
  // function getRecentProducts() {
  //   return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  // }

  // const { data, isLoading } = useQuery({
  //   queryKey: ['recentProducts'],
  //   queryFn: getRecentProducts,
  //   // gcTime: 3000
  //   select:(data)=> data?.data.data
  // });





  const { data, isLoading } = useProducts()
  const { addProductToCart } = useContext(CartContext);

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
          <div key={product.id} className="w-1/6 product p-2 gy-">
            <Link to={`productsdetails/${product.id}`}>
              <img src={product.imageCover} alt={product.title} className="w-full" />
              <h2 className='text-main text-sm'>{product.category.name}</h2>
              <h2 className='font-medium'>{product.title.split(' ').slice(0, 2).join(' ')}</h2>
              <div className="flex justify-between my-2">
                <h3>{product.price} EGP</h3>
                <h3><i className='fas fa-star rating-color'></i> {product.ratingsAverage}</h3>
              </div>
            </Link>
            <div className="btn w-full bg-main text-white rounded py-1 px-3" onClick={() => addProductToCart(product.id)}>
              Add To Cart
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
