import React from 'react'
import Slider from "react-slick";
import slider1 from '../../../finalProject assets/sliders/slide1.png'
import slider2 from '../../../finalProject assets/sliders/slide2.png'
import slider3 from '../../../finalProject assets/sliders/slide3.png'
import slider4 from '../../../finalProject assets/sliders/slide4.png'
import slider5 from '../../../finalProject assets/sliders/slide5.png'
import slider6 from '../../../finalProject assets/sliders/slide6.png'
import slider7 from '../../../finalProject assets/sliders/slide7.png'


export default function GallerySlider() {
  var settings = {
    dots: true,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };

  return (

    <>
      <Slider   {...settings} className='mt-5 mb-4 pt-5' >
        <div>
          <img src={slider1} className='w-100' alt="" />
        </div>

        <div>
          <img src={slider2} className='w-100' alt="" />
        </div>

        <div>
          <img src={slider3} className='w-100' alt="" />
        </div>

        <div>
          <img src={slider4} className='w-100' alt="" />
        </div>

        <div>
          <img src={slider5} className='w-100' alt="" />
        </div>

        <div>
          <img src={slider6} className='w-100' alt="" />
        </div>

        <div>
          <img src={slider7} className='w-100' alt="" />
        </div>
      </Slider>
    </>
  )
}
