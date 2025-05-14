
import { Toaster } from 'react-hot-toast'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ReceipeProvide } from './context/ReciepeContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ReceipeProvide>
    <Toaster />
    <App />
    </ReceipeProvide>
  </AuthProvider>
)
