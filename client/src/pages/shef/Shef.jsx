import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Modal from "../../components/Modal";
import { useEffect } from "react";
import { socket } from "../../utils/socket";
import toast from "react-hot-toast";
import { handleGetRequest } from "../../Api/get";
import { handlePatchRequest } from "../../Api/patch";
import { CgLogOut } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const Shef = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const { user,removeLocalStorage } = useAuth();
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_ORDER_URL;

  const [isOpen, setIsOpen] = useState({
    isOpen: false,
    order: [],
  });

  const handleUpdate = async (id, status) => {
    if (!user?.token) return;
    const response = await handlePatchRequest(
      URL + `update-status/`,
      id,
      { status },
      user?.token
    );

    if (status == "processed") {
      setData((prev) =>
        prev.filter((curEle) => curEle._id != response.data._id)
      );
    } else {
      setData((prev) =>
        prev.map((curEle) => {
          if (curEle._id == response.data._id) {
            return response.data;
          } else {
            return curEle;
          }
        })
      );
    }
  };

  useEffect(() => {
    const handleOrder = (data) => {
      setData((prev) => [data.order, ...prev]);
      toast.success("New Order from table" + " " + data.order.table.username);
    };

    socket.on("order-placed", handleOrder);

    return () => {
      socket.close("order-placed", handleOrder);
    };
  }, []);

  const loadOrder = async () => {
    if (!user?.token) return;
    const response = await handleGetRequest(URL + "sheff-order", user?.token);
    setData(response.data);
  };

  useEffect(() => {
    if (user?.token) {
      loadOrder();
    }
  }, [user?.token]);

  return isLoading ? (
    "Loading..."
  ) : (
    <div id="container">
      <div id="banner">
              <CgLogOut
                onClick={() => {
                  removeLocalStorage();
                  navigate("/");
                }}
              />
            </div>
      <div id="banner">
        <h1>Orders</h1>
      </div>
      <div id="sub-container">
        {data.length == 0? "No Orders Yet" : data.map((curEle) => (
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

              <select
                name=""
                id="delete"
                value={curEle.status}
                onChange={(e) => handleUpdate(curEle._id, e.target.value)}
              >
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
