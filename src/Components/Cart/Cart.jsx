import React, { useContext, useState } from 'react'
import { authContext } from '../../Context/AuthContext'
import axios from 'axios';
import { baseUrl } from '../Shared/baseUrl';
import { CartContext } from '../../Context/CartContext';
import { notify } from '../Shared/notify';
import { useNavigate } from 'react-router-dom';
import cartEmpty from '../../finalProject assets/empty-cart.png'
import Cartitem from './Cartitem';


export default function Cart() {
  let navigate = useNavigate();
  let { token } = useContext(authContext);
  let { products, setProducts, setTotalCartPrice, totalCartPrice, getCart, setCartNumber, cartId } = useContext(CartContext);
  let [loading, setLoading] = useState(false);

  async function removeCartItem(id) {

    try {
      setLoading(true);
      let { data: { data: { products },status } } = await axios.delete(baseUrl + 'cart/' + id, { headers: { token: token } });
      setProducts(products);
      notify('Item Removed Successfully', 'error', 'top-left')
      getCart();
      if(status=='success')
      {
        setLoading(false);
      }

    } catch ({ response: { data: { message } } }) {
      console.log(message);
    }

  }

  async function updateQTY(id, count) {

    if (count < 1) {
      notify(`can't decrease more than this you can remove item`, 'error', 'top-left');
      return;
    }
    setLoading(true);
    let { data: { status } } = await axios.put(baseUrl + 'cart/' + id, { count: count }, { headers: { token: token } });
    getCart();
    notify(' update the quantity sucessfully', 'info', 'top-left');

    if (status == 'success') {
      setLoading(false);
    }
  }

  async function clear() {

    try {
      if (products[0] == undefined) {
        notify('cart is already clear', 'warning', 'top-center');
        return;
      }

      setLoading(true);
      let { data:{message} } = await axios.delete(baseUrl + 'cart', { headers: { token: token } });
      notify('cart cleared', 'error', 'top-center');
      setProducts([]);
      setCartNumber(0);
      setTotalCartPrice(0);
      if(message=='success')
      {
        setLoading(false)
      }


    } catch (error) {
      console.log(error);
    }
  }

  async function paymentVisa(cartId) {
    try {

      let { data: { session: { url } } } = await axios.post(baseUrl + 'orders/checkout-session/' + cartId, {}, { headers: { token: token } });
      window.location.href = url;

    } catch ({ response: { data: { message } } }) {
      console.log(message);
    }

  }

  async function paymentCash(cartId, token) {
    try {
      let { data: { data } } = await axios.post(baseUrl + 'orders/' + cartId,
        {
          "shippingAddress": {
            "details": "details",
            "phone": "01010800921",
            "city": "Cairo"
          }
        }
        , { headers: { token: token } });


      getCart();

      notify('order is created', 'success', 'top-left');

      setTimeout(() => {
        navigate('/allorders');

      }, 2000);


    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='min-vh-100'>
      <div className="container-fluid mt-5 pt-5">
        <div className='row d-flex mx-3 justify-content-between bg-body-tertiary shadow-sm rounded-pill'>

          <div className=' col-md-6 py-5 ' >
            <h2 className='text-center'> TOTAL CART PRICE : <span className='text-main fw-bolder'>{totalCartPrice}  EGP</span></h2>
          </div>


          <div className='col-md-6 d-flex justify-content-center align-items-center'>
            <button disabled={products[0] == undefined?true:false}  onClick={() => { paymentVisa(cartId) }} className='m-3 btn text-success'> PAY VISA<i className="fa-brands fa-cc-visa mx-2" ></i></button>
            <button disabled={products[0] == undefined?true:false} onClick={() => { paymentCash(cartId, token) }} className='m-3 btn text-success'>PAY CASH<i className="fa-solid fa-sack-dollar mx-2"></i></button>
          </div>

        </div>

        {products[0] == undefined ? <div className=' row w-75 m-auto mt-4 d-flex justify-content-center align-items-center '>

          <img src={cartEmpty} alt="" />

        </div>
          : null}


        {products.map((elem) => {

          return <Cartitem key={elem._id} element={elem} remove={removeCartItem} update={updateQTY} loading={loading} />

        })}


        <div className='text-center my-5'>
          <button  disabled={products[0] == undefined?true:false}   onClick={clear} className='btn btn-outline-danger'> <i className="fa-solid fa-circle-minus px-3" ></i>CLEAR ALL ITEMS</button>
        </div>


      </div>
    </div>
  )
}

