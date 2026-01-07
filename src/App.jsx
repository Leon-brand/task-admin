import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute, PublicRoute } from "./auth/ProtectedRoute";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { TaskList } from "./tasks/pages/TaskList";
import { CreateTask } from "./tasks/pages/CreateTask";
import "./App.css";


function App() {

  return (
   <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/create" element={<ProtectedRoute><CreateTask /></ProtectedRoute>} />
          <Route path="/" element={<ProtectedRoute><TaskList /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </HashRouter>
  )
}

export default App
