import React, { useContext, useState } from 'react';
import { createContext } from "react";
import { authContext } from './AuthContext';
import { baseUrl } from '../Components/Shared/baseUrl';
import axios from 'axios';
import { notify } from '../Components/Shared/notify';

export let wishContext = createContext();

export default function WishContextProvider({ children }) {

    let { token } = useContext(authContext);
    let [wishlist, setWishlist] = useState([]);
    let [loading, setLoading] = useState(true);
    let[bg,setBg]=useState(false);


    async function getUserWishlist() {
        try {

            let { data: { data } } = await axios.get(baseUrl + 'wishlist', { headers: { token: token } });
            setWishlist(data);
            setLoading(false)
            if(data[0]==undefined){
                setBg(true)
            }

        } catch (error) {
            console.log(error);
        }
    }



    async function removeFromWishlist(productId) {
        try {

            let { data: { data = [] } = {} } = await axios.delete(baseUrl + 'wishlist/' + productId, { headers: { token: token } });
            getUserWishlist();
            notify('this item removed from your wishlist', 'error', 'top-center')

        } catch (error) {
            console.log(error);
        }
    }




    async function addToWishlist(productId) {
        try {

            let data = await axios.post(baseUrl + 'wishlist', { productId: productId }, { headers: { token: token } })
            notify('this item added to your wishlist', 'success', 'top-center');

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <wishContext.Provider value={{ addToWishlist, getUserWishlist, removeFromWishlist, wishlist, loading,bg }}>
            {children}
        </wishContext.Provider>
    )
}

