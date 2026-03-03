import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "../../styles/admin.css";
import { handleGetRequest } from "../../Api/get";
import Modal from "../../components/Modal";
import NavBar from "../../components/NavBar";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";

const History = () => {
  const ORDER_URL = import.meta.env.VITE_API_URL + "/order/";
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState({ isOpen: false, order: [] });

  const loadOrders = async () => {
    if (!user?.token) return;
    const response = await handleGetRequest(ORDER_URL, user?.token);
    if (response.success) {
      setData(response.data);
      setIsLoading(false);
    } else {
      toast.error("Failed To Load Data");
    }
  };

  useEffect(() => {
    if (user?.token) loadOrders();
  }, [user?.token]);

  const handleModal = (order) => setIsOpen({ isOpen: true, order });

  if (isLoading) return <Loader />;

  return (
    <div id="container">
      <header>
        <NavBar />
        <div id="banner">
          <h1>Order History</h1>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
            {data.length} total order{data.length !== 1 ? "s" : ""}
          </span>
        </div>
      </header>
      <div id="sub-container">
        {data.length === 0 ? (
          <div className="empty-state">No order history.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Table</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Date</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {data.map((curEle) => (
                <tr key={curEle._id}>
                  <td style={{ fontWeight: 600 }}>{curEle.table.username}</td>
                  <td style={{ fontWeight: 600 }}>₹{curEle.totalAmount}</td>
                  <td>
                    <span className={`badge badge-${curEle.status}`}>{curEle.status}</span>
                  </td>
                  <td>
                    <span className={`badge badge-${curEle.paymentStatus}`}>{curEle.paymentStatus}</span>
                  </td>
                  <td style={{ color: "#888", fontSize: 13 }}>
                    {new Date(curEle.orderedAt).toLocaleDateString("en-IN")}
                  </td>
                  <td>
                    <button onClick={() => handleModal(curEle.order)}>View</button>
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

export default History;
