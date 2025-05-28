import { NavLink, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { CgLogOut } from "react-icons/cg";
import { CiMenuFries } from "react-icons/ci";
import "../styles/navbar.css";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const NavBar = () => {
  const { removeLocalStorage } = useAuth();
  const [open,setOpen] = useState(false)
  const navigate = useNavigate();

  const openState = {
    transform:"translateY(0%)"
  }

  const closeState = {
    transform:"translateY(-100%)"
  }

  return (
      <nav id="desktop-view">
        <h1>Logo</h1>
        <ul>
          <li id="hideonmobile">
            <NavLink to="/dashboard">Home</NavLink>
          </li>
          <li id="hideonmobile">
            <NavLink to="/orders">Orders</NavLink>
          </li>
          <li id="hideonmobile">
            <NavLink to="/tables">Tables</NavLink>
          </li>
          <li id="hideonmobile">
            <NavLink to="/all-reciepe">Reciepe</NavLink>
          </li>
          <li id="hideonmobile">
            <NavLink to="/history">History</NavLink>
          </li>
        </ul>

        <h1 id="hamburger" onClick={()=>{
          setOpen(true)
        }}>
          <CiMenuFries />
        </h1>
        <h1 id="hideonmobile">
          <CgLogOut
            onClick={() => {
              removeLocalStorage();
              navigate("/");
            }}
          />
        </h1>

        <ul id="sidebar" style={open? openState : closeState}>
          <IoClose onClick={()=>setOpen(false)}/>
          <li>
            <NavLink to="/dashboard">Home</NavLink>
          </li>
          <li>
            <NavLink to="/orders">Orders</NavLink>
          </li>
          <li>
            <NavLink to="/tables">Tables</NavLink>
          </li>
          <li>
            <NavLink to="/all-reciepe">Reciepe</NavLink>
          </li>
          <li>
            <NavLink to="/history">History</NavLink>
          </li>
          <h1>
            <CgLogOut
              onClick={() => {
                removeLocalStorage();
                navigate("/");
              }}
            />
          </h1>
        </ul>
      </nav>
  );
};

export default NavBar;
