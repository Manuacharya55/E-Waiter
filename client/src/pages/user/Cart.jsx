import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import CartComponent from "../../components/CartComponent";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { handleGetRequest } from "../../Api/get";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate()
  const [totalPrice, setTotalPrice] = useState(0);
  const { cart,cartDispatch } = useCart();
  const { user } = useAuth();

  const CART_URL = import.meta.env.VITE_POST_CART_URL+"fetch-cart"

  const fetchCart = async() =>{
    if(!user?.token) return
    const response = await handleGetRequest(CART_URL,user?.token)
    cartDispatch({
      type:"INITIAL",
      payload:{
        data:response.data
      }
    })
  }
  useEffect(() => {
    if(user?.token) fetchCart()
  }, [user?.token]);
  return cart.length <= 0 ? (
    "No Items In The Cart"
  ) : (
    <div id="cart-container">
      <h1>Cart</h1>
      <button id="delete" onClick={()=>{
        navigate("/reciepe")
      }}>Go Back</button>
      {cart.map((curEle) => (
        <CartComponent
          prop={curEle}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
        />
      ))}

      <div id="total-price">
        <h1>total amount : ₹ {totalPrice}</h1>
        <button id="delete">Place Order</button>
      </div>
    </div>
  );
};

export default Cart;
