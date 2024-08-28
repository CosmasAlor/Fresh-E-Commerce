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

<div className="flex flex-col md:flex-row  w-full">
  <div className="md:w-3/4 w-full">
    <Slider {...settings}>
      <img src={slide1} alt="" className="h-[400px] w-full object-cover" />
      <img src={slide2} alt="" className="h-[400px] w-full object-cover" />
      <img src={slide3} alt="" className="h-[400px] w-full object-cover" />
    </Slider>
  </div>
  <div className="hidden md:block md:w-1/4 w-full mt-4 md:mt-0">
    <img src={slide2} alt="" className="h-[200px] w-full object-cover mb-4 md:mb-0" />
    <img src={slide3} alt="" className="h-[200px] w-full object-cover" />
  </div>
</div>


</>
}
