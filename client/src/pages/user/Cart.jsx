import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import CartComponent from "../../components/CartComponent";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { handleGetRequest } from "../../Api/get";
import { useNavigate } from "react-router-dom";
import { handleDeleteRequest } from "../../Api/delete";
import toast from "react-hot-toast";
import { handlePostRequest } from "../../Api/post";

const Cart = () => {
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const { cart, cartDispatch } = useCart();
  const { user } = useAuth();

  const CART_URL = import.meta.env.VITE_POST_CART_URL;
  const ORDER_URL = import.meta.env.VITE_ORDER_URL;

  const fetchCart = async () => {
    if (!user?.token) return;
    const response = await handleGetRequest(
      CART_URL + "fetch-cart",
      user?.token
    );
    cartDispatch({
      type: "INITIAL",
      payload: {
        data: response.data,
      },
    });
  };

  useEffect(() => {
    if (user?.token) fetchCart();
  }, [user?.token]);

  const clearCart = async () => {
    if(!user?.token) return

    const response = await handleDeleteRequest(
      CART_URL + "clear-cart",
      user?.token
    );

    if(response.success){
      toast.success("Cart Cleared")
      cartDispatch({
        type:"CLEAR_CART"
      })
    }else{
      toast.error("Error Clearing Cart")
    }
  };

  const handleOrder = async()=>{
    if(!user?.token) return
    const response = await handlePostRequest(ORDER_URL,{},user?.token);
    console.log(response)
    cartDispatch({
      type:"CLEAR_CART"
    })
    toast.success(response.message)
    navigate("/reciepe")
  }

  return cart.length <= 0 ? (
    "No Items In The Cart"
  ) : (
    <div id="cart-container">
      <h1>Cart</h1>
      <button
        id="delete"
        onClick={() => {
          navigate("/reciepe");
        }}
      >
        Go Back
      </button>
      {cart.map((curEle) => (
        <CartComponent
          prop={curEle}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
        />
      ))}

      <div id="total-price">
        <h1>total amount : ₹ {totalPrice}</h1>
        <div id="btn-holder">
          <button id="delete" onClick={clearCart}>Clear Cart</button>
          <button id="delete" onClick={handleOrder}>Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
