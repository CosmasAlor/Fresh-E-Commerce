import React, { useEffect, useState } from 'react';
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
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1200, // Large screens (>= 1200px)
        settings: {
          slidesToShow: 6,
        }
      },
      {
        breakpoint: 992, // Medium screens (>= 992px and < 1200px)
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 768, // Small screens (>= 768px and < 992px)
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 576, // Extra small screens (< 768px)
        settings: {
          slidesToShow: 2,
        }
      }
    ]
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
    <div className="container mx-auto px-4 py-8">
      <Slider {...settings}>
        {categories.map((category, index) => (
          <div key={index} className='flex flex-col items-center my-6 px-2'>
            <img src={category.image} alt={category.name} className="w-full h-[200px] object-cover mb-2" />
            <h3 className="text-center text-sm">{category.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
}
