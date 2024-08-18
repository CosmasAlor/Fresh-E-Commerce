import React, { useEffect, useState } from 'react';
import style from './CategorySlider.module.css';
import Slider from "react-slick";
import axios from 'axios';

export default function CategorySlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getRecentCategories() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getRecentCategories();
  }, []);

  return (
    <>
      <h1 className="text-3xl py-5">Category Slider</h1>
      <Slider {...settings}>
        {categories.map((category, index) => (
          <div key={index} className='my-6'>
            <img src={category.image} alt={category.name} className="w-full h-[200px]" />
            <h3>{category.name}</h3>
          </div>
        ))}
      </Slider>
    </>
  );
}
