import { useAuth } from "../../context/AuthContext";
import "../../styles/admin.css";
import NavBar from "../../components/NavBar";
import { useEffect, useState } from "react";
import { handleGetRequest } from "../../Api/get";
import toast from "react-hot-toast";

const DashBoard = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const URL = import.meta.env.VITE_DASHBOARD_URL;

  const loadDashboard = async () => {
    if (!user?.token) return;
    const response = await handleGetRequest(URL, user?.token);
    if(response.success){
      setData(response.data);
    setIsLoading(false);
    }else{
      toast.error("Failed To Load")
    }
  };

  useEffect(() => {
    if (user?.token) {
      loadDashboard();
    }
  }, [user?.token]);

  return isLoading ? (
    "Loading"
  ) : Array.isArray(data) && data.length === 0 ? "No Data Yet" : (
    <div id="container">
      <header>
        <NavBar />
      <div id="banner">
        <h1>Dashboard</h1>
      </div>
      </header>
      <div id="sub-container">
        <div id="tile">
          <h2>Total Users</h2>
          <h1>{data?.user}</h1>
        </div>
        <div id="tile">
          <h2>Total Reciepe</h2>
          <h1>{data?.reciepe}</h1>
        </div>
        <div id="tile">
          <h2>Total Order Count</h2>
          <h1>{data?.orders[0]?.totalOrders || 0}</h1>
        </div>
        <div id="tile">
          <h2>Total Earning</h2>
          <h1>₹ {data?.orders[0]?.totalAmount || 0}</h1>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
