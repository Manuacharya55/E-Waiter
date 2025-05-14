import { NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { IoGrid } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { LiaMoneyBillSolid } from "react-icons/lia";
import { IoFastFood } from "react-icons/io5";
import { CgLogOut } from "react-icons/cg";
import "../styles/navbar.css";

const NavBar = () => {
  return (
    <nav>
        <h1>Logo</h1>
      <ul>
        <li>
          <NavLink to="/dashboard">
            <IoHome />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/tables">
            <IoGrid />
            <span>Tables</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/all-food">
            <IoFastFood />
            <span>Reciepe</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/history">
            <FaHistory />
            <span>History</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/orders">
            <LiaMoneyBillSolid />
            <span>Orders</span>
          </NavLink>
        </li>
      </ul>
      <h1><CgLogOut /></h1>
    </nav>

  );
};

export default NavBar;
