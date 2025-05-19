import React, { useEffect, useState } from "react";
import { handleGetRequest } from "../../Api/get";
import { useAuth } from "../../context/AuthContext";
import Modal from "../../components/Modal";
import NavBar from "../../components/NavBar";
import { socket } from "../../utils/socket";
import toast from "react-hot-toast";
import { handlePatchRequest } from "../../Api/patch";

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
    const response = await handleGetRequest(
      ORDER_URL + "todays-orders",
      user?.token
    );
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
    "food status",
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

  useEffect(() => {
    const handleOrder = (data) => {
      setData((prev) => [...prev, data.order]);
      toast.success("New Order Place from" + " " + data.order.table.username);
    };
    socket.on("order-placed", handleOrder);

    return () => {
      socket.off("order-placed", handleOrder);
    };
  }, []);

  useEffect(() => {
    const handleStatusChange = (data) => {
      console.log(data.data);
      setData((prev) =>
        prev.map((curEle) => {
          if (curEle._id == data.data._id) {
            return data.data;
          } else {
            return curEle;
          }
        })
      );
    };

    socket.on("order-status-updated", handleStatusChange);

    return () => {
      socket.close("order-status-updated", handleStatusChange);
    };
  }, []);


  const handleChange = async(id,status)=>{
    console.log(id,status)
    if(!user?.token) return 
    const response = await handlePatchRequest(ORDER_URL +"update-payment-status/",id,{status},user?.token)
    console.log(response)
    setData((prev)=> prev.filter((curEle)=> curEle._id !== response.data._id))
    toast.success(response.message)
  }


  return isLoading ? (
    "Loading"
  ) : data.length == 0 ? (
    "No Orders Yet"
  ) : (
    <div id="container">
      <NavBar />
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
                <td>
                  <select name="" id="delete" value={curEle.paymentStatus} onChange={(e)=>handleChange(curEle._id,e.target.value)}>
                    <option value="pending">pending</option>
                    <option value="paid">paid</option>
                  </select>
                </td>
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
