import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useReciepe } from "../../context/ReciepeContext";
import { handleGetRequest } from "../../Api/get";
import { useEffect } from "react";
import Card from "../../components/Card";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { handlePostRequest } from "../../Api/post";
import toast from "react-hot-toast";
import { CgLogOut } from "react-icons/cg";

const Reciepe = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [food, setFood] = useState([]);
  const navigate = useNavigate();
  const btnArray = ["All", "Breakfast", "Lunch", "Snacks", "Dinner"];
  const [btnstate, setBtnState] = useState(0);
  const food_url = import.meta.env.VITE_ADD_FOOD_URL;
  const { user,removeLocalStorage } = useAuth();
  const { reciepe, reciepeDispatch } = useReciepe();
  const { cart, cartDispatch } = useCart();
  const CART_URL = import.meta.env.VITE_POST_CART_URL + "add/";

  const loadData = async () => {
    if (!user?.token) return;

    const response = await handleGetRequest(food_url, user?.token);
    reciepeDispatch({
      type: "INITIAL",
      payload: {
        data: response.data,
      },
    });
    setFood(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (user?.token) {
      loadData();
    }
  }, [user?.token]);

  const handleFilter = (index, curEle) => {
    setBtnState(index);

    const filterdata = curEle == "All" ? "" : curEle.toLowerCase();
    if (filterdata === "") {
      setFood(reciepe);
    } else {
      const filtered = reciepe.filter(
        (curFood) => curFood.foodtype.toLowerCase() === filterdata
      );
      setFood(filtered);
    }
  };

  const addToCart = async(food) => {
    const response = await handlePostRequest(`${CART_URL}${food._id}`,{},user.token)
    cartDispatch({
      type: "ADD_TO_CART",
      payload: {
        data: {
          food : response.data.food,
        },
      },
    });
    toast.success("Added To Cart")
  };
  return isLoading ? (
    "loading"
  ) : (
    <div id="container">
      <div id="banner">
        <h1 onClick={()=>{
                removeLocalStorage()
                navigate("/")
              }}>
              <CgLogOut />
            </h1>
      </div>
      <div id="banner">
        <h1>All Reciepes</h1>
      </div>

      <div id="banner">
        {btnArray.map((curEle, index) => {
          if (btnstate == index) {
            return (
              <button
                id="active"
                onClick={() => {
                  handleFilter(index, curEle);
                }}
              >
                {curEle}
              </button>
            );
          } else {
            return (
              <button id="delete" onClick={() => handleFilter(index, curEle)}>
                {curEle}
              </button>
            );
          }
        })}
      </div>
      <div id="banner">
        <button
          onClick={() => {
            navigate("/cart");
          }}
        >
          Go To Cart
        </button>
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
          : "No Reciepes Yet"}
      </div>
    </div>
  );
};

export default Reciepe;
