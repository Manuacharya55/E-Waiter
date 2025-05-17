import React, { useEffect, useState } from "react";
import { handleGetRequest } from "../../Api/get";
import { useAuth } from "../../context/AuthContext";
import Modal from "../../components/Modal";

const Orders = () => {
  const ORDER_URL = import.meta.env.VITE_ORDER_URL;
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState({
    isOpen: false,
    order: [],
  });
  const loadOrders = async () => {
    if (!user?.token) return;
    const response = await handleGetRequest(ORDER_URL, user?.token);
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (user?.token) {
      loadOrders();
    }
  }, [user?.token]);

  const tableheader = [
    "table",
    "order id",
    "total Amount",
    "status",
    "Payment Status",
    "orderedAt",
    "order",
  ];

  const handleModal = (order) => {
    setIsOpen({
      isOpen: true,
      order,
    });
    console.log(order);
  };

  return isLoading ? (
    "Loading"
  ) : data.length == 0 ? (
    "No Orders Yet"
  ) : (
    <div id="container">
      <div id="banner">
        <h1>All Orders</h1>
      </div>
      <div id="reciepe-container">
        <table>
          <thead>
            <tr>
              {tableheader.map((curEle) => (
                <th>{curEle}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((curEle) => (
              <tr>
                <td>{curEle.table.username}</td>
                <td>{curEle._id}</td>
                <td>₹ {curEle.totalAmount}</td>
                <td>{curEle.status}</td>
                <td>{curEle.paymentStatus}</td>
                <td>{Date(curEle.orderedAt).split("GMT")[0]}</td>
                <td>
                  <button id="delete" onClick={() => handleModal(curEle.order)}>
                    view details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Orders;
