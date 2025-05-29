import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "../../styles/admin.css";
import { handleGetRequest } from "../../Api/get";
import Modal from "../../components/Modal";
import NavBar from "../../components/NavBar";
import toast from "react-hot-toast";

const History = () => {
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
    if (response.success) {
      setData(response.data);
      setIsLoading(false);
    } else {
      toast.error("Failed To Load Data");
    }
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
  };

  return isLoading ? (
    "Loading"
  ) : (
    <div id="container">
      <header>
        <NavBar />
        <div id="banner">
          <h1>Order History</h1>
        </div>
      </header>
      <div id="sub-container">
        {data.length == 0 ? (
          "No Orders Yet"
        ) : (
          <table>
            <thead>
              <tr>
                {tableheader.map((curEle, id) => (
                  <th key={id}>{curEle}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((curEle) => (
                <tr key={curEle._id}>
                  <td>{curEle.table.username}</td>
                  <td>{curEle._id}</td>
                  <td>₹ {curEle.totalAmount}</td>
                  <td>{curEle.status}</td>
                  <td>{curEle.paymentStatus}</td>
                  <td>{new Date(curEle.orderedAt).toLocaleString("en-IN")}</td>
                  <td>
                    <button
                      id="delete"
                      onClick={() => handleModal(curEle.order)}
                    >
                      view details
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

export default History;
