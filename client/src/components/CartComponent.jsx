import React, { useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { useCart } from "../context/CartContext";
const CartComponent = ({ prop, totalPrice, setTotalPrice }) => {
  const {cartDispatch } = useCart();
  const handleChange = (operation) => {
    cartDispatch({
      type: operation,
      payload: {
        food: {
          _id: prop._id,
          name: prop.name,
          imageUrl: prop.imageUrl,
        },
      },
    });
  };
  useEffect(() => {
    setTotalPrice(prop.price * prop.quantity);
  }, [prop.price, prop.quantity]);

  return (
    <>
      <div id="cart-component">
        <img src={prop.imageUrl} alt="" />

        <div id="food-details">
          <p>Name : {prop.name}</p>
          <p>category : {prop.category}</p>
          <h2>₹{prop.price} * {prop.quantity}</h2>
        </div>

        <div id="operation">
          <CiCirclePlus
            onClick={() => {
              handleChange("INCREMENT");
            }}
          />
          <p>Quantity : {prop.quantity}</p>
          <CiCircleMinus
            onClick={() => {
              handleChange("DECREMENT");
            }}
          />
        </div>

        <div id="price">
          <p>Price</p>
          <h1>₹ {prop.price * prop.quantity}</h1>
        </div>
      </div>
    </>
  );
};

export default CartComponent;
