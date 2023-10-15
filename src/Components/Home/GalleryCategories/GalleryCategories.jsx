import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../Shared/baseUrl'
import Slider from "react-slick";
import Loading from '../../Shared/Loading/Loading';
import { Link } from 'react-router-dom';

export default function GalleryCategories({ home, check }) {
  let [categories, setCategories] = useState([]);
  let [loading, setLoading] = useState(true);

  async function getCategoriesApi() {

    try {
      
      let { data } = await axios.get(baseUrl + 'categories');
      setCategories(data.data);
      setLoading(false);
      check(1);
      
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => { getCategoriesApi() }, []);


  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 500,
    cssEase: "linear"

  }


  useEffect(() => {
    if (home) {
      setLoading(false)
    }
  }, []);

  return (

    <>

      {loading && <Loading />}

      <Slider   {...settings} >

        {categories.map((elem) => {
          
          return <div className='pt-4' key={elem._id}>

            <Link to={'/productcategory/' +elem._id} className='cursor-pointer nav-link'>
              <img src={elem.image} className='w-100 rounded-circle m-3 px-5 ' height={250} alt="" />
              <p className='fw-bolder text-center  text-main'>{elem.name}</p>
            </Link>

          </div>
        })}

      </Slider>

    </>
  )
}
