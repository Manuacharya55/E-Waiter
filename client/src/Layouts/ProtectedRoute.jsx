import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

const ProtectedLayout = ({ role }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user === null) return; // Still loading user state

    if (user?.token && user?.role === role) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
      navigate("/"); // Redirect to login
    }
  }, [user, navigate, role]);

  return isLoading ? <Loader /> : <Outlet />;
};

export default ProtectedLayout;
