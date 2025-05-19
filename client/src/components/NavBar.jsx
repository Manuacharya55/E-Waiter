import { NavLink, useNavigate } from "react-router-dom";

import { CgLogOut } from "react-icons/cg";
import "../styles/navbar.css";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const {removeLocalStorage} = useAuth();
  const navigate = useNavigate();
  return (
    <nav>
      <h1>Logo</h1>
      <ul>
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
        
      </ul>
      <h1>
        <CgLogOut onClick={()=>{
          removeLocalStorage()
          navigate("/")
        }}/>
      </h1>
    </nav>
  );
};

export default NavBar;
