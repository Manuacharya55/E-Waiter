import React, { useEffect, useState } from "react";
import { handleGetRequest } from "../../Api/get";
import { handlePatchRequest } from "../../Api/patch";
import { useAuth } from "../../context/AuthContext";
import Modal from "../../components/Modal";
import NavBar from "../../components/NavBar";
import { socket } from "../../utils/socket";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";

const Orders = () => {
  const ORDER_URL = import.meta.env.VITE_API_URL + "/order/";
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState({ isOpen: false, order: [] });

  const loadOrders = async () => {
    if (!user?.token) return;
    const response = await handleGetRequest(ORDER_URL + "todays-orders", user?.token);
    if (response.success) {
      setData(response.data);
      setIsLoading(false);
    } else {
      toast.error("Failed to load orders");
    }
  };

  const handleModal = (order) => setIsOpen({ isOpen: true, order });

  const handleChange = async (id, status) => {
    if (!user?.token) return;
    try {
      const response = await handlePatchRequest(
        ORDER_URL + "update-payment-status/", id, { status }, user.token
      );
      setData((prev) => prev.filter((order) => order._id !== response.data._id));
      toast.success(response.message);
    } catch (error) {
      toast.error("Failed to update");
    }
  };

  useEffect(() => {
    const handleOrderPlaced = (data) => {
      setData((prev) => [...prev, data.order]);
      toast.success("New Order from " + data.order.table.username);
    };
    socket.on("order-placed", handleOrderPlaced);
    return () => socket.off("order-placed", handleOrderPlaced);
  }, []);

  useEffect(() => {
    const handleStatusChange = (data) => {
      setData((prev) => prev.map((order) => (order._id === data.data._id ? data.data : order)));
    };
    socket.on("order-status-updated", handleStatusChange);
    return () => socket.off("order-status-updated", handleStatusChange);
  }, []);

  useEffect(() => {
    if (user?.token) loadOrders();
  }, [user?.token]);

  if (isLoading) return <Loader />;

  return (
    <div id="container">
      <header>
        <NavBar />
        <div id="banner">
          <h1>Today's Orders</h1>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
            {data.length} order{data.length !== 1 ? "s" : ""}
          </span>
        </div>
      </header>
      <div id="sub-container">
        {data.length === 0 ? (
          <div className="empty-state">No orders yet today.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Table</th>
                <th>Amount</th>
                <th>Food Status</th>
                <th>Payment</th>
                <th>Time</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order) => (
                <tr key={order._id}>
                  <td style={{ fontWeight: 600 }}>{order.table.username}</td>
                  <td style={{ fontWeight: 600 }}>₹{order.totalAmount}</td>
                  <td>
                    <span className={`badge badge-${order.status}`}>{order.status}</span>
                  </td>
                  <td>
                    <select
                      value={order.paymentStatus}
                      onChange={(e) => handleChange(order._id, e.target.value)}
                      style={{ minWidth: 100 }}
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                    </select>
                  </td>
                  <td style={{ color: "#888", fontSize: 13 }}>
                    {new Date(order.orderedAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                  </td>
                  <td>
                    <button onClick={() => handleModal(order.order)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Orders;
