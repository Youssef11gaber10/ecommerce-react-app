import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../../Context/AuthContext';
import { CartContext } from '../../Context/CartContext';
import { wishContext } from '../../Context/WishContext';
import Loading from '../Shared/Loading/Loading';
import wishlistEmpty from '../../finalProject assets/wishlist-empty.png'
import Cardwished from './Cardwished';

export default function Wishlist() {
    let { token } = useContext(authContext);
    let { addToCart } = useContext(CartContext);
    let { getUserWishlist, wishlist, removeFromWishlist, loading,bg } = useContext(wishContext);

    
    useEffect(() => {  getUserWishlist();}, [token]);

    return (
        <div className='min-vh-100'>
            <div className="container">
                <div className="row">

                    {loading && <Loading />}
                    
                    {bg?
                        <div className='row w-100 d-flex justify-content-center align-items-center '>
                            <img src={wishlistEmpty} alt="" />
                            <h2 className=' text-danger text-center fw-bolder'>oops you wishlist empty</h2>
                        </div>
                        : null}


                    {wishlist?.map((elem) => {

                        return <Cardwished key={elem.id} element={elem} addToCart={addToCart} removeFromWishlist={removeFromWishlist} />
                    })}



                </div>
            </div>

        </div>
    )
}
