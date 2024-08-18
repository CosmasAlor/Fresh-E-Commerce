import React, { useState } from 'react'
import style from './MainSlider.module.css'
import Slider from "react-slick";
import slide1 from '../../assets/images/slider-image-1.jpeg'
import slide2 from '../../assets/images/slider-image-2.jpeg'
import slide3 from '../../assets/images/slider-image-3.jpeg'

export default function MainSlider() {


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
    
  return     <>

<div className="flex">
  <div className="w-3/4">
  <Slider {...settings}>
      <img src={slide1} alt="" className="h-[400px] w-full " />
      <img src={slide2} alt="" className="h-[400px] w-full " />
      <img src={slide3} alt="" className="h-[400px] w-full " />
  </Slider>
  </div>
  <div className="1/4">
    <img src={slide2} alt="" className="h-[200px] w-full " />
    <img src={slide3} alt="" className="h-[200px] w-full " />
  </div>
</div>

</>
}
