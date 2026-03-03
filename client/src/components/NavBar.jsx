import { NavLink, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { CgLogOut } from "react-icons/cg";
import { CiMenuFries } from "react-icons/ci";
import "../styles/navbar.css";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const NavBar = () => {
  const { removeLocalStorage } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeLocalStorage();
    navigate("/");
  };

  return (
    <nav>
      <h1>E-Waiter</h1>
      <ul>
        <li id="hideonmobile"><NavLink to="/dashboard">Dashboard</NavLink></li>
        <li id="hideonmobile"><NavLink to="/orders">Orders</NavLink></li>
        <li id="hideonmobile"><NavLink to="/tables">Users</NavLink></li>
        <li id="hideonmobile"><NavLink to="/all-reciepe">Recipes</NavLink></li>
        <li id="hideonmobile"><NavLink to="/history">History</NavLink></li>
      </ul>

      <span id="hamburger" onClick={() => setOpen(true)}>
        <CiMenuFries />
      </span>

      <button id="logout" onClick={handleLogout} style={{ display: open ? "none" : undefined }}>
        <CgLogOut style={{ fontSize: 14 }} /> Logout
      </button>

      <ul
        id="sidebar"
        style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}
      >
        <IoClose onClick={() => setOpen(false)} />
        <li><NavLink to="/dashboard" onClick={() => setOpen(false)}>Dashboard</NavLink></li>
        <li><NavLink to="/orders" onClick={() => setOpen(false)}>Orders</NavLink></li>
        <li><NavLink to="/tables" onClick={() => setOpen(false)}>Users</NavLink></li>
        <li><NavLink to="/all-reciepe" onClick={() => setOpen(false)}>Recipes</NavLink></li>
        <li><NavLink to="/history" onClick={() => setOpen(false)}>History</NavLink></li>
        <li>
          <a onClick={handleLogout} style={{ cursor: "pointer", color: "#ff4444" }}>Logout</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
