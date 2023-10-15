import React from 'react'
import { Link } from 'react-router-dom'

export default function Cardwished({element:{ id, imageCover, brand: { name }, category: { name: na }, title, description, sold, price, quantity },addToCart,removeFromWishlist}) {
  return (
    <div  className=" col-md-6 col-lg-4  pt-5 mt-5 ">
    <div className="layout shadow p-3 rounded-5  bg-body-secondary">

        <Link className='nav-link' to={'/details/' + id}>

            <img src={imageCover} className='w-100 rounded-5 shadow-sm ' height={500} alt="" />
            <div className='d-flex justify-content-evenly py-2 '>
                <span className='fw-bolder'>Brand:<span className="text-main" >{name}</span></span>
                <span className='fw-bolder px-0'>Catgory:<span className="text-main " >{na}</span></span>
            </div >
            <h4 className='text-center fw-bolder my-2'>{title.split(' ').splice(0, 2).join(' ')}</h4>
            <p className='text-center text-muted'>{description.split(' ').splice(0, 10).join(' ')}</p>

            <div className='d-flex justify-content-evenly'>
                <span> Price:<span className="text-main" >{price}</span></span>
                <span>Quantity:<span className="text-main" >{quantity}</span></span>
                <span>Sold:<span className="text-main" >{sold}</span></span>
            </div>

        </Link>


        <div className='my-3 d-flex gap-2 '>
            <span onClick={() => { addToCart(id) }} className='btn bg-main text-white w-50 '>BUY $</span>
            <span onClick={() => { removeFromWishlist(id) }} className='btn bg-danger text-white w-50'> Remove <i className="fa-solid fa-trash" /></span>
        </div>


    </div>
</div>
  )
}
