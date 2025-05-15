import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import CartComponent from "../../components/CartComponent";

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const { cart } = useCart();

  return cart.length <= 0 ? (
    "No Items In The Cart"
  ) : (
    <div id="cart-container">
      <h1>Cart</h1>
      <button id="delete">Go Back</button>
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
