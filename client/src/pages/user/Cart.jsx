import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import CartComponent from "../../components/CartComponent";
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
  const CART_URL = import.meta.env.VITE_API_URL + "/cart/";
  const ORDER_URL = import.meta.env.VITE_API_URL + "/order/";

  const fetchCart = async () => {
    if (!user?.token) return;
    const response = await handleGetRequest(CART_URL + "fetch-cart", user?.token);
    if (response.success) {
      cartDispatch({ type: "INITIAL", payload: { data: response.data } });
    } else {
      toast.error("Failed To Load Cart");
    }
  };

  useEffect(() => {
    if (user?.token) fetchCart();
  }, [user?.token]);

  const clearCart = async () => {
    if (!user?.token) return;
    const response = await handleDeleteRequest(CART_URL + "clear-cart", user?.token);
    if (response.success) {
      toast.success("Cart Cleared");
      cartDispatch({ type: "CLEAR_CART" });
    } else {
      toast.error("Error Clearing Cart");
    }
  };

  const handleOrder = async () => {
    if (!user?.token) return;
    const response = await handlePostRequest(ORDER_URL, {}, user?.token);
    cartDispatch({ type: "CLEAR_CART" });
    if (response.success) {
      toast.success(response.message);
      navigate("/reciepe");
    } else {
      toast.error("Failed To Place Order");
    }
  };

  return (
    <div id="cart-container">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <h1>Your Cart</h1>
        <button onClick={() => navigate("/reciepe")}>← Back to Menu</button>
      </div>

      {cart.length <= 0 ? (
        <div className="empty-state">Your cart is empty. Go add some items!</div>
      ) : (
        <>
          {cart.map((curEle, idx) => (
            <CartComponent
              key={curEle.food?._id || idx}
              prop={curEle}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
            />
          ))}
          <div id="total-price">
            <h1>Total: ₹{totalPrice}</h1>
            <div id="btn-holder">
              <button id="edit" onClick={clearCart}>Clear Cart</button>
              <button id="delete" onClick={handleOrder}>Place Order</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
