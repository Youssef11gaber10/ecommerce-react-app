import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../../Context/AuthContext'
import axios from 'axios';
import { baseUrl } from '../Shared/baseUrl';
import Loading from '../Shared/Loading/Loading';
import Order from './Order';
import noOrder from '../../finalProject assets/cart-empty1.png'

export default function Allorders() {

    let { userData } = useContext(authContext);
    let [orders, setOrders] = useState([]);
    let [loading, setLoading] = useState(true);
    let [bg, setBg] = useState(false);

    async function getUserOrders(id) {

        try {

            if (id) {
                let { data } = await axios.get(baseUrl + 'orders/user/' + id);
                setOrders(data);
                setLoading(false);

                if (data[0]==undefined) {
                    setBg(true);
                }


            }
            else {

                console.log('Error: id not found yet');
                return;

            }

            
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => { getUserOrders(userData.id) }, [userData]);

    return (
        <div className='min-vh-100 d-flex flex-column justify-content-evenly pt-5 mt-5 '>

            {loading && <Loading />}

            {bg ?
                <div className='d-flex justify-content-center align-items-center '>
                    <img src={noOrder} alt="" />
                </div>: null}

            {orders.map((elem, index) => {

                return <Order key={elem.id} element={elem} index={index} />

            })}

        </div>

    )
}
