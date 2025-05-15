import { createContext, useContext, useReducer } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const cartReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_CART":
        const exists = state.find(
          (curEle) => curEle._id === action.payload.food._id
        );
        if (exists) {
          return state.map((curFood) => {
            if (curFood._id === action.payload.food._id) {
              return { ...curFood, quantity: curFood.quantity + 1 };
            }
            return curFood;
          });
        }
        return [...state, { ...action.payload.food, quantity: 1 }];

      case "INCREMENT":
        return state.map((curFood) => {
          if (curFood._id == action.payload.food._id) {
            return { ...curFood, quantity: curFood.quantity + 1 };
          }
          return curFood;
        });

      case "DECREMENT":
        return state
          .map((curFood) => {
            if (curFood._id === action.payload.food._id) {
              if (curFood.quantity > 1) {
                return { ...curFood, quantity: curFood.quantity - 1 };
              }
              return null;
            }
            return curFood;
          })
          .filter(Boolean);
    }
  };

  const [cart, cartDispatch] = useReducer(cartReducer, [
    {
      foodtype: "breakfast",
      imageUrl:
        "http://www.baltana.com/files/wallpapers-5/Pizza-HD-Wallpapers-15281.jpg",
      name: "Masala Dosa",
      category : "Breakfast",
      price: 60,
      quantity: 1,
      _id: "6820a18e07355a5fc1da0fcc",
    },
  ]);
  return (
    <CartContext.Provider value={{ cart, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("Cart is outside context");
  }

  return context;
};
