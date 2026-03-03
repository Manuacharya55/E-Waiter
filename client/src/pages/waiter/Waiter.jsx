import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Modal from "../../components/Modal";
import { handleGetRequest } from "../../Api/get";
import { handlePatchRequest } from "../../Api/patch";
import { CgLogOut } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { socket } from "../../utils/socket";
import toast from "react-hot-toast";

const Waiter = () => {
  const [data, setData] = useState([]);
  const { user, removeLocalStorage } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState({ isOpen: false, order: [] });
  const URL = import.meta.env.VITE_API_URL + "/order/";

  const handleUpdate = async (id, status) => {
    if (!user?.token) return;
    const response = await handlePatchRequest(URL + "update-status/", id, { status }, user?.token);
    if (status === "delivered") {
      setData((prev) => prev.filter((curEle) => curEle._id !== response.data._id));
      toast.success(`${response.data.table.username} — Food Delivered`);
    }
  };

  const fetchOrders = async () => {
    if (!user?.token) return;
    const response = await handleGetRequest(URL + "waiter-order", user?.token);
    setData(response.data);
  };

  useEffect(() => {
    if (user?.token) fetchOrders();
  }, [user?.token]);

  useEffect(() => {
    const handleOrder = (data) => {
      setData((prev) => [data.data, ...prev]);
      toast.success("Order ready for delivery");
    };
    socket.on("waiter-status-updated", handleOrder);
    return () => socket.off("waiter-status-updated", handleOrder);
  }, []);

  return (
    <div id="container">
      <div id="banner">
        <h1>Deliveries</h1>
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
          <div className="empty-state">No deliveries pending.</div>
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
                  <option value="processed">Ready</option>
                  <option value="delivered">Delivered</option>
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

export default Waiter;
