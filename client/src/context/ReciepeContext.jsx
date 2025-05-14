import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";

const ReciepeContext = createContext();

export const ReceipeProvide = ({ children }) => {
  const reciepeReducer = (state, action) => {
    switch (action.type) {
      case "INITIAL":
        console.log(action.payload.data);
        return action.payload.data;

      case "ADD":
        return [...state, action.payload.data];
      case "EDIT":
        return state.map((curEle) => {
          if (curEle._id !== action.payload.data._id) {
            return curEle;
          } else {
            return action.payload.data;
          }
        });

      case "DELETE":
        return state.map((curEle) => {
          if (curEle._id !== action.payload._id) {
            return curEle;
          } else {
            return action.payload.data;
          }
        });
    }
  };

  const [reciepe, reciepeDispatch] = useReducer(reciepeReducer, []);

  return (
    <ReciepeContext.Provider value={{ reciepe, reciepeDispatch }}>
      {children}
    </ReciepeContext.Provider>
  );
};

export const useReciepe = () => {
  const context = useContext(ReciepeContext);

  if (!context) {
    throw new Error("useReciepe must be used within an ReciepeProvider");
  }

  return context;
};
