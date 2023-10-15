import axios from 'axios';
import React, { useContext, useState } from 'react'
import { createContext } from "react";
import { authContext } from './AuthContext';
import { baseUrl } from '../Components/Shared/baseUrl';
import { useEffect } from 'react';
import { notify } from '../Components/Shared/notify';




export let CartContext = createContext();

export default function CartContextProvider({ children }) {

  let { token } = useContext(authContext);
  let [cartNumber, setCartNumber] = useState(0);
  let [cartId,setCartId]=useState('');
  let [products, setProducts] = useState([]);
  let [totalCartPrice,setTotalCartPrice]=useState(0);


   async function addToCart(productId) {

      try {

        let {data:{numOfCartItems}}=await axios.post(baseUrl+'cart',{productId:productId},{headers:{token:token}});

        if(numOfCartItems==cartNumber)
        {
          notify('Added Anoter One From The Same Product','success','top-left');
          getCart();
          return;
        }
        getCart();
        notify('Added Succesfully','success','top-left');

      }

       catch ({response:{data:{message}}}) {
        console.log(message);
      }

    }



   async function getCart() {
      try {

        let {data:{data:{_id,products,totalCartPrice},numOfCartItems}  } = await axios.get(baseUrl + 'cart', { headers: { token: token } })
        setCartId(_id)
        setCartNumber(numOfCartItems);
        setProducts(products);
        setTotalCartPrice(totalCartPrice);


      }catch ({response:{data:{message}}}) {

        console.log(message,'this work if token not here you usej[] not [token]');
        setCartId('');
        setCartNumber(0);
        setProducts([]);
        setTotalCartPrice(0);
     
      }
    }

    useEffect(()=>{getCart();},[token]);

    return (
        
        <CartContext.Provider value={{ cartNumber: cartNumber,setCartNumber, addToCart,getCart, products,setProducts,totalCartPrice,setTotalCartPrice,cartId }}>
            {children}
        </CartContext.Provider>
    )
}




























{/* <StoreContext.Provider prop={10} >//this is a normal props
<h1></h1>//this send as props but in children
{anything}
</StoreContext.Provider> */}

//& if you wanna recieve these children props
// ({children})//distruct the children this syntax because name of proprety in obj {childre:{props}} OR log(props.children)
// and if you wanna to log the props will return {prop:10,children:{H1,ANYTHING}}
//so <comp><> we send an element in nested compnent not to render but to use it in another thing like context
//or if condition happend render those children

// *so can do 
{/* <parent> */ }
//    </child1>
//    </child1>
// </parent>

//  and render this two componet depends on codition












