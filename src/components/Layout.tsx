import React from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
// import { useAuthStore } from '../store/authStore';
import { LogOut, User, Settings, Code2, LayoutDashboard } from "lucide-react";
import useAuthStore from "../store/authStore";

const Layout: React.FC = () => {
  // const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuthData, authData } = useAuthStore();

  const handleLogout = () => {
    setAuthData(null);
    document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    document.cookie = "role=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    navigate("/login");
  };

  // if (!user) {
  //   return <Outlet />;
  // }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <div className="p-4">
          <div className="flex items-center space-x-2">
            <Code2 className="h-8 w-8 text-blue-400" />
            <h1 className="text-xl font-bold">DevCollab AI</h1>
          </div>
        </div>

        <nav className="mt-8">
          <div className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase">
            Main
          </div>
          <Link
            to="/dashboard"
            className={`flex items-center px-4 py-3 ${
              location.pathname === "/dashboard"
                ? "bg-gray-800 text-blue-400"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            <LayoutDashboard className="h-5 w-5 mr-3" />
            Dashboard
          </Link>

          <Link
            to="/projects"
            className={`flex items-center px-4 py-3 ${
              location.pathname.startsWith("/projects")
                ? "bg-gray-800 text-blue-400"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            <Code2 className="h-5 w-5 mr-3" />
            Projects
          </Link>

          {/* {user.role === "admin" && (
            <Link
              to="/admin/developers"
              className={`flex items-center px-4 py-3 ${
                location.pathname.startsWith("/admin")
                  ? "bg-gray-800 text-blue-400"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <Users className="h-5 w-5 mr-3" />
              Manage Developers
            </Link>
          )} */}

          <div className="px-4 mt-6 mb-2 text-xs font-semibold text-gray-400 uppercase">
            Account
          </div>

          <Link
            to="/profile"
            className={`flex items-center px-4 py-3 ${
              location.pathname === "/profile"
                ? "bg-gray-800 text-blue-400"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            <User className="h-5 w-5 mr-3" />
            Profile
          </Link>

          <Link
            to="/settings"
            className={`flex items-center px-4 py-3 ${
              location.pathname === "/settings"
                ? "bg-gray-800 text-blue-400"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              {location.pathname === "/dashboard" && "Dashboard"}
              {location.pathname === "/projects" && "Projects"}
              {location.pathname.startsWith("/projects/") && "Project Details"}
              {location.pathname === "/profile" && "Profile"}
              {location.pathname === "/settings" && "Settings"}
              {location.pathname === "/admin/developers" && "Manage Developers"}
            </h2>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <img
                    src={
                      authData?.image ||
                      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80"
                    }
                    alt="User avatar"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                </div>
                {/* <span className="text-sm font-medium">{user.name}</span> */}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
