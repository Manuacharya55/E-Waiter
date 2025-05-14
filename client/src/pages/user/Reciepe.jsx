import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useReciepe } from "../../context/ReciepeContext";
import { handleGetRequest } from "../../Api/get";
import { useEffect } from "react";
import Card from "../../components/Card";

const Reciepe = () => {
  const [isLoading, setIsLoading] = useState(true);

  const food_url = import.meta.env.VITE_ADD_FOOD_URL;
  const { user } = useAuth();
  const { reciepe, reciepeDispatch } = useReciepe();

  const loadData = async () => {
    if (!user?.token) return;

    const response = await handleGetRequest(food_url, user?.token);
    reciepeDispatch({
      type: "INITIAL",
      payload: {
        data: response.data,
      },
    });
    setIsLoading(false);
    console.log(response);
  };

  useEffect(() => {
    if (user?.token) {
      loadData();
    }
  }, [user?.token]);
  return isLoading ? (
    "loading"
  ) : (
    <div id="container">
      <div id="banner">
        <h1>All Reciepes</h1>
      </div>

      <div id="banner">
        <button>All</button>
        <button id="delete">Breakfast</button>
        <button id="delete">Lunch</button>
        <button id="delete">Snacks</button>
        <button id="delete">Dinner</button>
      </div>
      <div id="banner">
        <button>Go To Cart</button>
      </div>
      <div id="reciepe-container">
        {reciepe.length > 0
          ? reciepe.map((curEle) => (
              <Card
                key={curEle._id}
                _id={curEle._id}
                name={curEle.name}
                foodtype={curEle.foodtype}
                price={curEle.price}
                editable={false}
                isActive={curEle.isActive}
              />
            ))
          : "No Reciepes Yet"}
      </div>
    </div>
  );
};

export default Reciepe;
