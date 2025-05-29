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
  imageUrl
}) => {
  return (
    <div id="card">
      <img
        src={imageUrl}
        alt=""
      />

      <div id="card-details">
        <h2>{name}</h2>
        <p>category : {category}</p>
        <h1>₹ {price}</h1>

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
                addToCart({ _id, name, category, price ,imageUrl :"http://www.baltana.com/files/wallpapers-5/Pizza-HD-Wallpapers-15281.jpg" });
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
