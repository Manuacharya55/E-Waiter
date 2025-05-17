import { createContext, useContext, useReducer } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const cartReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_CART":
        const exists = state.find((curEle) => {
          return curEle.food?._id === action.payload.data.food._id;
        });

        if (exists) {
          return state.map((curFood) => {
            if (curFood.food._id === action.payload.data.food._id) {
              return { ...curFood, quantity: curFood.quantity + 1 };
            }
            return curFood;
          });
        }
        return [...state, { food: action.payload.data.food, quantity: 1 }];

      case "INCREMENT":
        return state.map((curFood) => {
          if (curFood.food._id == action.payload.data) {
            return { ...curFood, quantity: curFood.quantity + 1 };
          }
          return curFood;
        });

      case "DECREMENT":
        return state
          .map((curFood) => {
            if (curFood.food._id === action.payload.data) {
              if (curFood.quantity > 1) {
                return { ...curFood, quantity: curFood.quantity - 1 };
              }
              return null;
            }
            return curFood;
          })
          .filter(Boolean);

      case "INITIAL":
        return action.payload.data;

      case "CLEAR_CART" :
        return []
    }
  };

  const [cart, cartDispatch] = useReducer(cartReducer, []);
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
