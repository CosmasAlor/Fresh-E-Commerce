import React, { useEffect, useState } from 'react';
import style from './ProductDetails.module.css';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import Slider from "react-slick";
import axios from 'axios';

export default function ProductDetails() {
  let { id } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  async function getProductsDetailsCategory(categoryId) {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${categoryId}`);
      setProductDetails(data.data);
    } catch (error) {
      setError('Failed to fetch product details');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProductsDetails(id);
  }, [id]);


  let categoryId = productDetails.category?.name;
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
      <h1 className="text-3xl py-5">Product Details</h1>
      <div className="flex items-center py-10">
      <div className="w-1/4">
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
        <div className="w-3/4 mx-10">
          <div>
            <h2>{productDetails.title}</h2>
            <p className="my-6 text-gray-500">{productDetails.description}</p>
          </div>
          <h2 className={`${style.textMain} text-sm`}>{productDetails.category?.name}</h2>
          <div className="flex justify-between my-2">
            <h3>{productDetails.price} EGP</h3>
            <h3>
              <i className={`fas fa-star ${style.ratingColor}`}></i> {productDetails.ratingsAverage}
            </h3>
          </div>
          <button className="btn w-full bg-main text-white rounded py-1 px-3 cursor-pointer">
            Add To Cart
          </button>
        </div>
      </div>
    </>
  );
}
