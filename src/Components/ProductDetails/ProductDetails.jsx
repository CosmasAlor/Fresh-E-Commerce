import React, { useContext, useEffect, useState } from 'react';
import style from './ProductDetails.module.css';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import Slider from "react-slick";
import axios from 'axios';
import { WishlistContext } from '../../Context/WishListContext';
import { CartContext } from '../../Context/CartContext';

export default function ProductDetails() {
  let { id } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addProductToCart } = useContext(CartContext);
  const { addWishlist } = useContext(WishlistContext);


  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  async function getProductsDetails(id) {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setProductDetails(data.data);
    } catch (error) {
      setError('Failed to fetch product details');
    } finally {
      setLoading(false);
    }
  }

  // async function getProductsDetailsCategory(categoryId) {
  //   try {
  //     let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${categoryId}`);
  //     setProductDetails(data.data);
  //   } catch (error) {
  //     setError('Failed to fetch product details');
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  useEffect(() => {
    getProductsDetails(id);
  }, [id]);


  // let categoryId = productDetails.category?.name;
  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <>
      
      <div className="flex flex-col lg:flex-row items-center py-10 w-11/12 lg:w-10/12 mx-auto mt-20">
  {/* Image Container */}
  <div className="lg:w-1/4 w-full lg:mr-8 mb-8 lg:mb-0">
    <div key={productDetails.id} className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {productDetails.images && productDetails.images.length > 1 ? (
        <Slider {...settings}>
          {productDetails.images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`${productDetails.title} image ${index + 1}`} className="w-full" />
            </div>
          ))}
        </Slider>
      ) : (
        <img src={productDetails.images?.[0]} alt={productDetails.title} className="w-full" />
      )}
    </div>
  </div>

  {/* Details Container */}
  <div className="lg:w-3/4 w-full">
    <div key={productDetails.id} className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h2 className='font-medium text-lg lg:text-xl'>{productDetails.title.split(' ').slice(0, 10).join(' ')}</h2>
      <p className="my-2 text-gray-500">{productDetails.description}</p>
      <span className='text-main text-sm'>{productDetails.category.name}</span>
      
      <div className="flex flex-col lg:flex-row lg:justify-between my-2 items-center">
        <h3 className="text-xl font-semibold">{productDetails.price} EGP</h3>
        <div className="flex items-center gap-2 mt-2 lg:mt-0">
          <button onClick={() => addWishlist(productDetails.id)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
            <i className='fa-regular fa-heart fa-2x'></i>
          </button>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{productDetails.ratingsAverage}</p>
          <div className="flex items-center">
            <i className='fas fa-star rating-color'></i>
          </div>
        </div>
      </div>

      <button 
        className="w-full bg-main text-white rounded py-1 px-3 mt-2 hover:bg-main-dark focus:outline-none focus:ring-4 focus:ring-main-dark"
        onClick={() => addProductToCart(productDetails.id)}
      >
        Add To Cart
      </button>
    </div>
  </div>
</div>

    </>
  );
}
