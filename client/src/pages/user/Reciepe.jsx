import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useReciepe } from "../../context/ReciepeContext";
import { handleGetRequest } from "../../Api/get";
import Card from "../../components/Card";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { handlePostRequest } from "../../Api/post";
import toast from "react-hot-toast";
import { CgLogOut } from "react-icons/cg";
import { FiShoppingCart } from "react-icons/fi";
import Loader from "../../components/Loader";

const Reciepe = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [food, setFood] = useState([]);
  const navigate = useNavigate();
  const btnArray = ["All", "Breakfast", "Lunch", "Snacks", "Dinner"];
  const [btnstate, setBtnState] = useState(0);
  const food_url = import.meta.env.VITE_API_URL + "/food/";
  const { user, removeLocalStorage } = useAuth();
  const { reciepe, reciepeDispatch } = useReciepe();
  const { cart, cartDispatch } = useCart();
  const CART_URL = import.meta.env.VITE_API_URL + "/cart/add/";

  const loadData = async () => {
    if (!user?.token) return;
    const response = await handleGetRequest(food_url, user?.token);
    reciepeDispatch({ type: "INITIAL", payload: { data: response.data } });
    setFood(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (user?.token) loadData();
  }, [user?.token]);

  const handleFilter = (index, curEle) => {
    setBtnState(index);
    const filterdata = curEle === "All" ? "" : curEle.toLowerCase();
    if (filterdata === "") {
      setFood(reciepe);
    } else {
      setFood(reciepe.filter((f) => f.foodtype.toLowerCase() === filterdata));
    }
  };

  const addToCart = async (food) => {
    const response = await handlePostRequest(`${CART_URL}${food._id}`, {}, user.token);
    cartDispatch({
      type: "ADD_TO_CART",
      payload: { data: { food: response.data.food } },
    });
    toast.success("Added to cart");
  };

  if (isLoading) return <Loader />;

  return (
    <div id="container">
      <div id="banner" style={{ justifyContent: "space-between" }}>
        <h1>Menu</h1>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button onClick={() => navigate("/cart")} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <FiShoppingCart size={14} /> Cart {cart.length > 0 && `(${cart.length})`}
          </button>
          <button
            onClick={() => { removeLocalStorage(); navigate("/"); }}
            style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "#fff" }}
          >
            <CgLogOut />
          </button>
        </div>
      </div>

      <div className="filter-bar">
        {btnArray.map((curEle, index) => (
          <button
            key={index}
            className={`filter-btn ${btnstate === index ? "active" : ""}`}
            onClick={() => handleFilter(index, curEle)}
          >
            {curEle}
          </button>
        ))}
      </div>

      <div id="sub-container">
        {food.length > 0
          ? food.map((curEle) => (
            <Card
              key={curEle._id}
              _id={curEle._id}
              category={curEle.category}
              name={curEle.name}
              foodtype={curEle.foodtype}
              price={curEle.price}
              editable={false}
              isActive={curEle.isActive}
              imageUrl={curEle.imageUrl}
              addToCart={addToCart}
            />
          ))
          : <div className="empty-state">No recipes available.</div>}
      </div>
    </div>
  );
};

export default Reciepe;
