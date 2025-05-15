import { Toaster } from "react-hot-toast";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ReceipeProvide } from "./context/ReciepeContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ReceipeProvide>
      <CartProvider>
        <Toaster />
        <App />
      </CartProvider>
    </ReceipeProvide>
  </AuthProvider>
);
