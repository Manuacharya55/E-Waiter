import React from "react";
import "../styles/admin.css";
const Card = ({
  _id,
  name,
  category,
  foodtype,
  price,
  editable = false,
  isActive,
  onEdit,
  onDelete,
  addToCart,
}) => {
  return (
    <div id="card">
      <img
        src="http://www.baltana.com/files/wallpapers-5/Pizza-HD-Wallpapers-15281.jpg"
        alt=""
      />

      <div id="card-details">
        <h2>{name}</h2>
        <p>category : {foodtype}</p>
        <h1>{price}rs</h1>

        {editable ? (
          <div id="btn-holder">
            <button id="edit" onClick={() => onEdit(_id)}>
              Edit
            </button>
            <button id="delete" onClick={() => onDelete(_id)}>
              {isActive ? "Deactivate" : "Activate"}
            </button>
          </div>
        ) : (
          <div id="btn-holder">
            <button
              id="delete"
              onClick={() => {
                addToCart({ _id, name, foodtype, price ,category,imageUrl :"http://www.baltana.com/files/wallpapers-5/Pizza-HD-Wallpapers-15281.jpg" });
              }}
            >
              Add to cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
