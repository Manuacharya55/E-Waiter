import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Modal from "../../components/Modal";
import { handleGetRequest } from "../../Api/get";
import { useEffect } from "react";
import { handlePatchRequest } from "../../Api/patch";
import { CgLogOut } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const Waiter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const { user,removeLocalStorage } = useAuth();
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState({
    isOpen: false,
    order: [],
  });

  const URL = import.meta.env.VITE_ORDER_URL;

  const handleUpdate = async (id, status) => {
    if (!user?.token) return;

    const response = await handlePatchRequest(
      URL + `update-status/`,
      id,
      { status },
      user?.token
    );

    if (status == "delivered") {
      console.log("processed");
      setData((prev) =>
        prev.filter((curEle) => curEle._id != response.data._id)
      );
    }
  };

  const fetchOrders = async () => {
    if (!user?.token) return;

    const response = await handleGetRequest(URL + "waiter-order", user?.token);
    setData(response.data);
  };

  useEffect(() => {
    if (user?.token) {
      fetchOrders();
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

              <select
                name=""
                id="delete"
                value={curEle.status}
                onChange={(e) => handleUpdate(curEle._id, e.target.value)}
              >
                <option value="processed">Yet to Deliver</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Waiter;
