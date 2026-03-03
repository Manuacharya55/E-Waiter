import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Modal from "../../components/Modal";
import { socket } from "../../utils/socket";
import toast from "react-hot-toast";
import { handleGetRequest } from "../../Api/get";
import { handlePatchRequest } from "../../Api/patch";
import { CgLogOut } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const Shef = () => {
  const [data, setData] = useState([]);
  const { user, removeLocalStorage } = useAuth();
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_API_URL + "/order/";
  const [isOpen, setIsOpen] = useState({ isOpen: false, order: [] });

  const handleUpdate = async (id, status) => {
    if (!user?.token) return;
    const response = await handlePatchRequest(URL + "update-status/", id, { status }, user?.token);
    if (status === "processed") {
      setData((prev) => prev.filter((curEle) => curEle._id !== response.data._id));
    } else {
      setData((prev) => prev.map((curEle) => (curEle._id === response.data._id ? response.data : curEle)));
    }
  };

  useEffect(() => {
    const handleOrder = (data) => {
      setData((prev) => [data.order, ...prev]);
      toast.success("New Order from " + data.order.table.username);
    };
    socket.on("order-placed", handleOrder);
    return () => socket.off("order-placed", handleOrder);
  }, []);

  const loadOrder = async () => {
    if (!user?.token) return;
    const response = await handleGetRequest(URL + "sheff-order", user?.token);
    setData(response.data);
  };

  useEffect(() => {
    if (user?.token) loadOrder();
  }, [user?.token]);

  return (
    <div id="container">
      <div id="banner">
        <h1>Kitchen Orders</h1>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
            {data.length} pending
          </span>
          <button
            onClick={() => { removeLocalStorage(); navigate("/"); }}
            style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", display: "flex", alignItems: "center", gap: 6 }}
          >
            <CgLogOut size={14} /> Logout
          </button>
        </div>
      </div>

      <div id="sub-container">
        {data.length === 0 ? (
          <div className="empty-state">No pending orders.</div>
        ) : (
          data.map((curEle) => (
            <div className="order-tile" key={curEle._id}>
              <h1>{curEle.table.username}</h1>
              <div className="order-tile-btn">
                <button onClick={() => setIsOpen({ isOpen: true, order: curEle.order })}>
                  View Details
                </button>
                <select
                  value={curEle.status}
                  onChange={(e) => handleUpdate(curEle._id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="processed">Processed</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Shef;
