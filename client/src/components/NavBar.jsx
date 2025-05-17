import { NavLink } from "react-router-dom";

import { CgLogOut } from "react-icons/cg";
import "../styles/navbar.css";

const NavBar = () => {
  return (
    <nav>
      <h1>Logo</h1>
      <ul>
        <li>
          <NavLink to="/dashboard">Home</NavLink>
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
        <li>
          <NavLink to="/orders">Orders</NavLink>
        </li>
      </ul>
      <h1>
        <CgLogOut />
      </h1>
    </nav>
  );
};

export default NavBar;
