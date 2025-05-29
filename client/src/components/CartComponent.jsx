import React, { useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { useCart } from "../context/CartContext";
import { handlePostRequest } from "../Api/post";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const CartComponent = ({ prop, totalPrice, setTotalPrice }) => {
  const { cart, cartDispatch } = useCart();
  const INCREMENT_URL = import.meta.env.VITE_POST_CART_URL + "add/";
  const DECREMENT_URL = import.meta.env.VITE_POST_CART_URL + "remove/";
  const { user } = useAuth();

  const handleChange = async (operation) => {
    const URL = operation == "INCREMENT" ? INCREMENT_URL : DECREMENT_URL;

    const response = await handlePostRequest(
      `${URL}${prop.food._id}`,
      {},
      user.token
    );

    if (response.success) {
      const { _id } = response.data?.food || prop.food;

      cartDispatch({
        type: operation,
        payload: {
          data: _id,
        },
      });
      toast.success(`added to cart`)
    } else {
      toast.error("failed to add")
    }
  };

  useEffect(() => {
    setTotalPrice(
      cart.reduce((sum, acc) => sum + acc.food.price * acc.quantity, 0)
    );
  }, [prop.food.price, prop.quantity]);

  return (
    <>
      <div id="cart-component">
        <img src={prop.food?.imageUrl} alt="" />

        <div id="food-details">
          <p>Name : {prop.food.name}</p>
          <p>category : {prop.food.category}</p>
          <h2>
            ₹{prop.food.price} * {prop.quantity}
          </h2>
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
          <h1>₹ {prop.food.price * prop.quantity}</h1>
        </div>
      </div>
    </>
  );
};

export default CartComponent;
