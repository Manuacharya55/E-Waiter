import React, { useEffect, useState } from "react";
import { handleGetRequest } from "../../Api/get";
import { handlePatchRequest } from "../../Api/patch";
import { useAuth } from "../../context/AuthContext";
import Modal from "../../components/Modal";
import NavBar from "../../components/NavBar";
import { socket } from "../../utils/socket";
import toast from "react-hot-toast";

const Orders = () => {
  const ORDER_URL = import.meta.env.VITE_ORDER_URL;
  const { user } = useAuth();

  // State declarations
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState({ isOpen: false, order: [] });

  // Table header constant
  const tableHeader = [
    "table",
    "order id",
    "total Amount",
    "food status",
    "Payment Status",
    "orderedAt",
    "order",
  ];

  // Fetch orders from API
  const loadOrders = async () => {
    if (!user?.token) return;
    try {
      const response = await handleGetRequest(
        ORDER_URL + "todays-orders",
        user.token
      );
      setData(response.data);
    } catch (error) {
      toast.error("Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  };

  // Modal open handler
  const handleModal = (order) => {
    setIsOpen({ isOpen: true, order });
  };

  // Handle payment status change
  const handleChange = async (id, status) => {
    if (!user?.token) return;
    try {
      const response = await handlePatchRequest(
        ORDER_URL + "update-payment-status/",
        id,
        { status },
        user.token
      );
      // Remove order from list after payment update
      setData((prev) =>
        prev.filter((order) => order._id !== response.data._id)
      );
      toast.success(response.message);
    } catch (error) {
      toast.error("Failed to update payment status");
    }
  };

  // Socket event handler: new order placed
  useEffect(() => {
    const handleOrderPlaced = (data) => {
      setData((prev) => [...prev, data.order]);
      toast.success("New Order Placed from " + data.order.table.username);
    };

    socket.on("order-placed", handleOrderPlaced);
    return () => socket.off("order-placed", handleOrderPlaced);
  }, []);

  // Socket event handler: order status updated
  useEffect(() => {
    const handleStatusChange = (data) => {
      setData((prev) =>
        prev.map((order) => (order._id === data.data._id ? data.data : order))
      );
    };

    socket.on("order-status-updated", handleStatusChange);
    return () => socket.off("order-status-updated", handleStatusChange);
  }, []);

  // Load orders on mount or token change
  useEffect(() => {
    if (user?.token) {
      loadOrders();
    }
  }, [user?.token]);

  return isLoading ? (
    "Loading"
  ) : (
    <div id="container">
      <header>
        <NavBar />
        <div id="banner">
          <h1>Today's Orders</h1>
        </div>
      </header>
      <div id="sub-container">
        {data.length == 0 ? (
          "No orders yet"
        ) : (
          <table>
            <thead>
              <tr>
                {tableHeader.map((header, idx) => (
                  <th key={idx}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((order) => (
                <tr key={order._id}>
                  <td>{order.table.username}</td>
                  <td>{order._id}</td>
                  <td>₹ {order.totalAmount}</td>
                  <td>{order.status}</td>
                  <td>
                    <select
                      id="delete"
                      value={order.paymentStatus}
                      onChange={(e) => handleChange(order._id, e.target.value)}
                    >
                      <option value="pending">pending</option>
                      <option value="paid">paid</option>
                    </select>
                  </td>
                  <td>{new Date(order.orderedAt).toLocaleString()}</td>
                  <td>
                    <button
                      id="delete"
                      onClick={() => handleModal(order.order)}
                    >
                      View Details
                    </button>
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
