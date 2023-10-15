import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import navImg from '../../finalProject assets/imgs/freshcart-logo.svg'


import { CartContext } from '../../Context/CartContext'
import { authContext } from '../../Context/AuthContext'



export default function Navbar() {

    let { cartNumber } = useContext(CartContext);
    let { token, setToken } = useContext(authContext)
    let navigate = useNavigate()


    function Signout() {

        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        setToken(null);
        navigate('/login');

    }




    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
                <div className="container-fluid px-5  py-3">
                    <NavLink className="navbar-brand" to="/home"><img src={navImg} alt="" /></NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {token ?
                            <>
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                                    <li className="nav-item">
                                        <div className='d-flex justify-content-center'>
                                            <NavLink className="nav-link" to="/home">Home <i className="fa-solid fa-house"></i></NavLink>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <div className='d-flex justify-content-center'>
                                            <NavLink className="nav-link" to="/products">Products</NavLink>
                                        </div>

                                    </li>

                                    <li className="nav-item">
                                        <div className='d-flex justify-content-center'>
                                            <NavLink className="nav-link" to="/categories">Categories</NavLink>
                                        </div>
                                    </li>


                                    <li className="nav-item">
                                        <div className='d-flex justify-content-center'>
                                            <NavLink className="nav-link" to="/brands">Brands</NavLink>
                                        </div>
                                    </li>

                                    <li className="nav-item">
                                        <div className='d-flex justify-content-center'>
                                            <NavLink className="nav-link" to="/allorders">Orders</NavLink>
                                        </div>
                                    </li>

                                    <li className="nav-item">
                                        <div className='d-flex justify-content-center'>
                                            <NavLink className="nav-link" to="/wishlist">WishList <i className="fa-solid fa-heart"></i></NavLink>
                                        </div>
                                    </li>


                                    <li className="nav-item mx-3">

                                        <div className='d-flex justify-content-center'>
                                            <NavLink className="nav-link  position-relative" to="/cart"><i className="fa-solid fa-cart-shopping fa-shake fa-2xl text-main" style={{ color: '' }}></i>

                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-main">
                                                    {cartNumber}
                                                    <span className="visually-hidden">unread messages</span>
                                                </span>
                                            </NavLink>
                                        </div>
                                    </li>



                                </ul>
                            </>
                            : null}



                        <ul className="navbar-nav ms-auto mb-2  mb-lg-0">
                            <div className='d-flex justify-content-center'>
                                <ul className='navbar-nav d-flex flex-row'>
                                    <li className='nav-item mx-2 my-2 '> <i className='fa-brands fa-facebook' style={{ color: '#0aad0a' }}></i></li>
                                    <li className='nav-item mx-2 my-2 '> <i className='fa-brands fa-linkedin' style={{ color: '#0aad0a' }}></i></li>
                                    <li className='nav-item mx-2 my-2 '> <i className='fa-brands fa-github' style={{ color: '#0aad0a' }}></i></li>
                                    <li className='nav-item mx-2 my-2 '> <i className='fa-brands fa-twitch' style={{ color: '#0aad0a' }}></i></li>
                                </ul>
                            </div>



                            {token ?
                                <>
                                    <li className="nav-item ">
                                        <div className='d-flex justify-content-center'>

                                            <NavLink className="nav-link" to="/profile">Profile <i className="fa-solid fa-user"></i></NavLink>
                                        </div>
                                    </li>
                                    <li className="nav-item ">
                                        <div className='d-flex justify-content-center'>
                                            <span onClick={Signout} className="nav-link cursor-pointer" >Signout<i className="fa-solid fa-right-from-bracket"></i></span>

                                        </div>
                                    </li>
                                </>
                                
                                : <>
                                    <li className="nav-item ">
                                        <div className='d-flex justify-content-center'>
                                            <NavLink className="nav-link" to="/login">Login</NavLink>
                                        </div>
                                    </li>
                                    <li className="nav-item ">
                                        <div className='d-flex justify-content-center'>
                                            <NavLink className="nav-link" to="/register">Register</NavLink>
                                        </div>
                                    </li>
                                </>}




                        </ul>

                    </div>
                </div>
            </nav>


        </>
    )
}
