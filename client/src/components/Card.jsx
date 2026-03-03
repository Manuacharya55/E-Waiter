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
  imageUrl,
}) => {
  return (
    <div id="card">
      <img src={imageUrl} alt={name} />

      <div id="card-details">
        {editable && (
          <span className={`card-badge ${isActive ? "card-badge-active" : "card-badge-inactive"}`}>
            {isActive ? "Active" : "Inactive"}
          </span>
        )}
        <h2>{name}</h2>
        <p>{foodtype}</p>
        <h1>₹{price}</h1>
      </div>

      <div id="btn-holder">
        {editable ? (
          <>
            <button id="edit" onClick={() => onEdit(_id)}>Edit</button>
            <button id="delete" onClick={() => onDelete(_id)}>
              {isActive ? "Deactivate" : "Activate"}
            </button>
          </>
        ) : (
          <button
            id="delete"
            onClick={() => addToCart({ _id, name, category, price, imageUrl })}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
