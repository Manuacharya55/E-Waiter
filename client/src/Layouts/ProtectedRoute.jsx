import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedLayout = ({ role }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    if (user?.token && user?.role === role) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
      navigate(-1); // Go back to previous page
    }
  }, [user, navigate, role]);

  return isLoading ? "Loading" : <Outlet />;
};

export default ProtectedLayout;
