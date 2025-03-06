import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useAuthStore } from "./store/authStore";

// Components
import Layout from "./components/Layout";

// PagesprojectId
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import AdminDevelopers from "./pages/AdminDevelopers";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // const { isAuthenticated } = useAuthStore();

  const cookies = document.cookie.split("; ");
  const token = cookies.find((row) => row.startsWith("token="))?.split("=")[1];
  const role = cookies.find((row) => row.startsWith("role="))?.split("=")[1];

  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:projectId" element={<ProjectDetail />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="admin/developers" element={<AdminDevelopers />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
