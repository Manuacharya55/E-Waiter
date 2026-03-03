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
import Loader from "../../components/Loader";
import { IoClose } from "react-icons/io5";

const AllReciepe = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState("");

  const food_url = import.meta.env.VITE_API_URL + "/food/";
  const { user, setReciepe } = useAuth();
  const { reciepe, reciepeDispatch } = useReciepe();

  const name = useRef();
  const foodtype = useRef();
  const price = useRef();
  const [imageUrl, setImageUrl] = useState();

  const loadData = async () => {
    if (!user?.token) return;
    const response = await handleGetRequest(food_url, user.token);
    reciepeDispatch({ type: "INITIAL", payload: { data: response.data } });
    setReciepe(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (user?.token) loadData();
  }, [user?.token]);

  const openAddModal = () => {
    setIsEditing(false);
    setId("");
    setImageUrl(null);
    setShowModal(true);
  };

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
      loading: isEditing ? "Updating..." : "Adding...",
      success: (response) => {
        if (response.success) {
          reciepeDispatch({
            type: isEditing ? "EDIT" : "ADD",
            payload: { data: response.data },
          });
          setShowModal(false);
          return isEditing ? "Updated successfully" : "Added successfully";
        } else {
          throw new Error("Failed");
        }
      },
      error: (err) => err.message || "Failed",
    });
  };

  const handleOnchange = (e) => {
    const file = e.target?.files[0];
    const result = handleUpload(file);
    toast.promise(result, {
      loading: "Uploading image...",
      success: (response) => {
        setImageUrl(response);
        return "Image uploaded";
      },
      error: (err) => err.message,
    });
  };

  const handleEdit = async (id) => {
    if (!user?.token) return;
    const response = await handleGetRequest(`${food_url}${id}`, user.token);
    setIsEditing(true);
    setId(id);
    setImageUrl(response.data.imageUrl);
    setShowModal(true);
    // Defer setting ref values until modal is rendered
    setTimeout(() => {
      if (name.current) name.current.value = response.data.name;
      if (foodtype.current) foodtype.current.value = response.data.foodtype;
      if (price.current) price.current.value = response.data.price;
    }, 50);
  };

  const handleDelete = async (id) => {
    if (!user?.token) return;
    const response = await handlePatchRequest(
      food_url + "active-status/",
      id,
      {},
      user?.token
    );
    if (response.success) {
      reciepeDispatch({ type: "EDIT", payload: { data: response.data } });
      toast.success("Status Updated");
    } else {
      toast.error("Failed to Update Status");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div id="container">
      <header>
        <NavBar />
        <div id="banner">
          <h1>All Recipes</h1>
          <button onClick={openAddModal}>+ Add Recipe</button>
        </div>
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
          : <div className="empty-state">No recipes yet. Click "+ Add Recipe" to get started.</div>}
      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              <IoClose />
            </button>
            <h2>{isEditing ? "Edit Recipe" : "Add Recipe"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Recipe Name</label>
                <input type="text" placeholder="Enter recipe name" ref={name} required />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select ref={foodtype} required>
                  <option value="">Select category</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="snacks">Snacks</option>
                  <option value="dinner">Dinner</option>
                </select>
              </div>
              <div className="form-group">
                <label>Price (₹)</label>
                <input type="number" placeholder="Enter price" ref={price} required />
              </div>
              <div className="form-group">
                <label>Image</label>
                <input type="file" onChange={handleOnchange} />
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Preview"
                    style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8, marginTop: 8 }}
                  />
                )}
              </div>
              <button type="submit" className="form-submit">
                {isEditing ? "Update Recipe" : "Add Recipe"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllReciepe;
