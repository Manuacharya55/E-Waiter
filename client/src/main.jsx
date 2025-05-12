
import { Toaster } from 'react-hot-toast'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <Toaster />
    <App />
  </AuthProvider>
)
