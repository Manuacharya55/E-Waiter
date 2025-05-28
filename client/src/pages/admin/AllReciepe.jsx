import React, { useEffect, useRef, useState } from "react";
import Card from "../../components/Card";
import { handleUpload } from "../../utils/imageUpload";
import toast from "react-hot-toast";
import { handlePostRequest } from "../../Api/post";
import { useAuth } from "../../context/AuthContext";
import { handleGetRequest } from "../../Api/get";
import { handlePatchRequest } from "../../Api/patch";
import { useReciepe } from "../../context/ReciepeContext";
import NavBar from "../../components/NavBar";

const AllReciepe = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState("");

  const food_url = import.meta.env.VITE_ADD_FOOD_URL;
  const { user, setReciepe } = useAuth();
  const { reciepe, reciepeDispatch } = useReciepe();

  const name = useRef();
  const foodtype = useRef();
  const price = useRef();
  const [imageUrl, setImageUrl] = useState();

  const loadData = async () => {
    if (!user?.token) return;

    const response = await handleGetRequest(food_url, user.token);
    reciepeDispatch({
      type: "INITIAL",
      payload: {
        data: response.data,
      },
    });
    setReciepe(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (user?.token) {
      loadData();
    }
  }, [user?.token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let serverResponse;
    const data = {
      name: name.current.value,
      foodtype: foodtype.current.value,
      price: price.current.value,
      imageUrl: imageUrl,
    };

    if (!user.token) return;

    if (isEditing) {
      serverResponse = handlePatchRequest(food_url, id, data, user.token);
    } else {
      serverResponse = handlePostRequest(food_url, data, user.token);
    }

    toast.promise(serverResponse, {
      loading: "Reciepe is uploading",
      success: (response) => {
        if (response.success) {
          if (isEditing) {
            reciepeDispatch({
              type: "EDIT",
              payload: {
                data: response.data,
              },
            });
          } else {
            reciepeDispatch({
              type: "ADD",
              payload: {
                data: response.data,
              },
            });
          }
        } else {
          throw new Error("Failed to upload");
        }
      },
      error: (err) => err.messaage || "Failed to Uplaod",
    });
  };

  const handleOnchange = (e) => {
    const file = e.target?.files[0];
    const result = handleUpload(file);

    toast.promise(result, {
      loading: "Image is Uploading",
      success: (response) => {
        setImageUrl(response);
      },
      error: (err) => err.message,
    });
  };

  const handleEdit = async (id) => {
    if (user?.token) return;
    const response = await handleGetRequest(`${food_url}${id}`, user.token);
    name.current.value = response.data.name;
    foodtype.current.value = response.data.foodtype;
    price.current.value = response.data.price;
    setImageUrl(response.data.imageUrl);

    setIsEditing(true);
    setId(id);
  };

  // YET TO BUILD
  const handleDelete = async (id) => {
    if (!user?.token) return;

    const response = await handlePatchRequest(
      food_url + "active-status/",
      id,
      {},
      user?.token
    );
    reciepeDispatch({
      type: "EDIT",
      payload: {
        data: response.data,
      },
    });
  };

  return isLoading ? (
    "Loading"
  ) : (
    <div id="container">
      <header>
        <NavBar></NavBar>
      <div id="banner">
        <h1>All Reciepes</h1>
      </div>

      <form id="add-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter Reciepe Name" ref={name} />
        <select name="" id="" ref={foodtype}>
          <option value="">--choose one---</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="snacks">Snacks</option>
          <option value="dinner">Dinner</option>
        </select>
        <input type="file" onChange={handleOnchange} />
        <input type="number" placeholder="Enter Price" ref={price} />
        <button type="submit">{isEditing ? "Update" : "Add Reciepe"}</button>
      </form>
      </header>

      <div id="sub-container">
        {reciepe.length > 0
          ? reciepe.map((curEle) => (
              <Card
                key={curEle._id}
                _id={curEle._id}
                name={curEle.name}
                foodtype={curEle.foodtype}
                price={curEle.price}
                editable={true}
                isActive={curEle.isActive}
                onEdit={handleEdit}
                onDelete={handleDelete}
                imageUrl={curEle.imageUrl}
              />
            ))
          : "No Reciepes Yet"}
      </div>
    </div>
  );
};

export default AllReciepe;
