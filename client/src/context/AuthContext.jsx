import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const setLocalStorage = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setIsLoggedIn(true);
    setUser({ token, role });
    console.log(token,role)
  };

  const removeLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setUser(null);
  };

  const loadLocalStorage = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token && !role) {
      return null;
    }

    setIsLoggedIn(true);
    setUser({ token, role });
  };

  useEffect(() => {
    loadLocalStorage();
  }, []);

  return (
    <AuthContext.Provider value={{ setLocalStorage, removeLocalStorage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
