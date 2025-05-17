import { useState } from "react";
import "../../styles/admin.css";
import { useAuth } from "../../context/AuthContext";
import { handleGetRequest } from "../../Api/get";
import { useEffect } from "react";

const Tables = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const URL = import.meta.env.VITE_AUTH_URL+"list-users"

  const fetchUsers = async () => {
    if (!user?.token) return;
    const response = await handleGetRequest(URL, user?.token);
    console.log(response)
  };

  useEffect(()=>{
    if(user?.token){
      fetchUsers()
    }
  },[user?.token])
  
  return (
    <div id="container">
      <div id="banner">
        <h1>All Tables</h1>
      </div>

      <div id="add-form">
        <input type="text" placeholder="Enter Table Name" />
        <input type="text" placeholder="Enter Table Password" />
        <select>
          <option value="">---- select one ----</option>
          <option value="user">User</option>
          <option value="sheff">Sheff</option>
          <option value="waiter">Waiter</option>
        </select>
        <button>Add Table</button>
      </div>

      <div id="table-container">
        <table>
          <thead>
            <tr>
              <th>table name</th>
              <th>role</th>
              <th>role</th>
              <th>isActive</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {Array(10)
              .fill()
              .map(() => (
                <tr>
                  <td>table name</td>
                  <td>role</td>
                  <td>role</td>
                  <td>isActive</td>
                  <td>Operation</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tables;
