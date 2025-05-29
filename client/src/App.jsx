import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import DashBoard from "./pages/admin/DashBoard";
import AllReciepe from "./pages/admin/AllReciepe";
import Orders from "./pages/admin/Orders";
import History from "./pages/admin/History";
import Reciepe from "./pages/user/Reciepe";
import Cart from "./pages/user/Cart";
import Tables from "./pages/admin/Tables";
import Shef from "./pages/shef/Shef";
import Waiter from "./pages/waiter/Waiter";
import ProtectedLayout from "./Layouts/ProtectedRoute";
import "./styles/admin.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Admin Routes */}
        <Route element={<ProtectedLayout role="admin" />}>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/all-reciepe" element={<AllReciepe />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/history" element={<History />} />
        </Route>

        {/* Table/User Routes */}
        <Route element={<ProtectedLayout role="table" />}>
          <Route path="/reciepe" element={<Reciepe />} />
          <Route path="/cart" element={<Cart />} />
        </Route>

        {/* Sheff Routes */}
        <Route element={<ProtectedLayout role="sheff" />}>
          <Route path="/sheff" element={<Shef />} />
        </Route>

        {/* Waiter Routes */}
        <Route element={<ProtectedLayout role="waiter" />}>
          <Route path="/waiter" element={<Waiter />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
