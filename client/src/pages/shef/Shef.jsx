import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Modal from "../../components/Modal";
import { useEffect } from "react";
import { socket } from "../../utils/socket";
import toast from "react-hot-toast";
import { handleGetRequest } from "../../Api/get";

const Shef = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const { user } = useAuth();
  const URL = import.meta.env.VITE_ORDER_URL;
  const [isOpen, setIsOpen] = useState({
    isOpen: false,
    order: [],
  });

  const handleUpdate = async () => {};

  useEffect(() => {
    const handleOrder = (data) => {
      console.log(data.order);
      setData((prev) => [data.order, ...prev]);
      toast.success("New Order from table" + " " + data.order.table.username);
    };

    socket.on("order-placed", handleOrder);

    return () => {
      socket.close("order-placed", handleOrder);
    };
  }, []);

  const loadOrder = async () => {
    console
    if (!user?.token) return;
    const response = await handleGetRequest(URL + "shef-order", user?.token);
    setData(response.data);
  };
  useEffect(() => {
    if (user?.token) {
      loadOrder();
    }
  },[user?.token]);

  return isLoading ? (
    "Loading..."
  ) : (
    <div id="container">
      <div id="banner">
        <h1>Orders</h1>
      </div>
      <div id="reciepe-container">
        {data.map((curEle) => (
          <div id="tile">
            <h1>{curEle.table.username}</h1>
            <div id="tile-btn">
              <button
                id="delete"
                onClick={() => {
                  setIsOpen({
                    isOpen: true,
                    order: curEle.order,
                  });
                }}
              >
                view Details
              </button>

              <select name="" id="delete">
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="processed">Processed</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Shef;
