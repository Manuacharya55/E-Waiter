import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import DashBoard from "./pages/admin/DashBoard";
import AllReciepe from "./pages/admin/AllReciepe";
import Orders from "./pages/admin/Orders";
import History from "./pages/admin/History";
import Reciepe from "./pages/user/Reciepe";
import "./styles/admin.css"
import Cart from "./pages/user/Cart";
import Tables from "./pages/admin/Tables";
import Shef from "./pages/shef/Shef";
import Waiter from "./pages/waiter/Waiter";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/all-reciepe" element={<AllReciepe />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/history" element={<History />} />

        <Route path="/reciepe" element={<Reciepe />} />
        <Route path="/cart" element={<Cart />} />

       <Route path="/shef" element={<Shef />} />
       <Route path="/waiter" element={<Waiter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
