import { useRef, useState } from "react";
import "../../styles/admin.css";
import { useAuth } from "../../context/AuthContext";
import { handleGetRequest } from "../../Api/get";
import { useEffect } from "react";
import { handlePatchRequest } from "../../Api/patch";
import toast from "react-hot-toast";
import NavBar from "../../components/NavBar";
import { handlePostRequest } from "../../Api/post";
import { socket } from "../../utils/socket";

const Tables = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const name = useRef();
  const password = useRef();
  const userrole = useRef();

  const URL = import.meta.env.VITE_AUTH_URL;

  const fetchUsers = async () => {
    if (!user?.token) return;
    const response = await handleGetRequest(URL + "list-users", user?.token);
    if(response.success){
      setData(response.data);
    setIsLoading(false);
    }else{
      toast.error("Failed To Load Data")
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchUsers();
    }
  }, [user?.token]);

  const handleActivation = async (id) => {
    if (!user?.token) return;
    const response = await handlePatchRequest(
      URL + "active-status/",
      id,
      {},
      user?.token
    );
    setData(
      data.map((curEle) => {
        if (curEle._id === id) {
          return {
            _id: response.data._id,
            username: response.data.username,
            role: response.data.role,
            isActive: response.data.isActive,
          };
        } else {
          return curEle;
        }
      })
    );

    toast.success(response.message);
  };

  const addUsers = async (e) => {
    e.preventDefault();
    if (!user?.token) return;
    const userData = {
      username: name.current.value,
      password: password.current.value,
      role: userrole.current.value,
    };
    const response = await handlePostRequest(
      URL + "register",
      userData,
      user?.token
    );
    const { username, _id, role, isActive } = response.data.user;
    setData((prev) => [...prev, { username, _id, role, isActive }]);
    toast.success(response.message);
  };

  return isLoading ? (
    "Loading"
  ) : (
    <div id="container">
      <header>
        <NavBar />
      <div id="banner">
        <h1>All Tables</h1>
      </div>

      <div id="add-form">
        <form onSubmit={addUsers}>
          <input type="text" placeholder="Enter Table Name" ref={name} />
          <input
            type="text"
            placeholder="Enter Table Password"
            ref={password}
          />
          <select ref={userrole}>
            <option value="">---- select one ----</option>
            <option value="table">table</option>
            <option value="sheff">Sheff</option>
            <option value="waiter">Waiter</option>
          </select>
          <button type="submit">Add Table</button>
        </form>
      </div>
      </header>

      <div id="sub-container">
        {data.length == 0? "No Users Yet" : <table>
          <thead>
            <tr>
              <th>name</th>
              <th>role</th>
              <th>isActive</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {data.map((curEle) => (
              <tr key={curEle._id}>
                <td>{curEle.username}</td>
                <td>{curEle.role}</td>
                <td>{curEle.isActive ? "Active" : "Inactive"}</td>
                <td>
                  <button
                    id="delete"
                    onClick={() => handleActivation(curEle._id)}
                  >
                    {curEle.isActive ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>}
      </div>
    </div>
  );
};

export default Tables;
