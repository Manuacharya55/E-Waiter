import { useRef, useState, useEffect } from "react";
import "../../styles/admin.css";
import { useAuth } from "../../context/AuthContext";
import { handleGetRequest } from "../../Api/get";
import { handlePatchRequest } from "../../Api/patch";
import toast from "react-hot-toast";
import NavBar from "../../components/NavBar";
import { handlePostRequest } from "../../Api/post";
import Loader from "../../components/Loader";
import { IoClose } from "react-icons/io5";

const Tables = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const name = useRef();
  const password = useRef();
  const userrole = useRef();

  const URL = import.meta.env.VITE_API_URL + "/auth/";

  const fetchUsers = async () => {
    if (!user?.token) return;
    const response = await handleGetRequest(URL + "list-users", user?.token);
    if (response.success) {
      setData(response.data);
      setIsLoading(false);
    } else {
      toast.error("Failed To Load Data");
    }
  };

  useEffect(() => {
    if (user?.token) fetchUsers();
  }, [user?.token]);

  const handleActivation = async (id) => {
    if (!user?.token) return;
    const response = await handlePatchRequest(
      URL + "active-status/", id, {}, user?.token
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
        }
        return curEle;
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
    const response = await handlePostRequest(URL + "register", userData, user?.token);
    const { username, _id, role, isActive } = response.data.user;
    setData((prev) => [...prev, { username, _id, role, isActive }]);
    toast.success(response.message);
    setShowModal(false);
  };

  if (isLoading) return <Loader />;

  return (
    <div id="container">
      <header>
        <NavBar />
        <div id="banner">
          <h1>Users & Tables</h1>
          <button onClick={() => setShowModal(true)}>+ Add User</button>
        </div>
      </header>

      <div id="sub-container">
        {data.length === 0 ? (
          <div className="empty-state">No users yet. Click "+ Add User" to get started.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((curEle) => (
                <tr key={curEle._id}>
                  <td style={{ fontWeight: 600 }}>{curEle.username}</td>
                  <td>
                    <span className="badge" style={{ background: "#f5f5f5", color: "#333", textTransform: "capitalize" }}>
                      {curEle.role}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${curEle.isActive ? "badge-active" : "badge-inactive"}`}>
                      {curEle.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => handleActivation(curEle._id)}>
                      {curEle.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ADD USER MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              <IoClose />
            </button>
            <h2>Add New User</h2>
            <form onSubmit={addUsers}>
              <div className="form-group">
                <label>Username</label>
                <input type="text" placeholder="Enter username" ref={name} required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="Enter password" ref={password} required />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select ref={userrole} required>
                  <option value="">Select role</option>
                  <option value="table">Table</option>
                  <option value="sheff">Chef</option>
                  <option value="waiter">Waiter</option>
                </select>
              </div>
              <button type="submit" className="form-submit">Add User</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tables;
