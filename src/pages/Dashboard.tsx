import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProjectStore } from "../store/projectStore";
// import { useAuthStore } from "../store/authStore";
import { Calendar, Code2, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import useAuthStore from "../store/authStore";

const Dashboard: React.FC = () => {
  const { fetchProjects } = useProjectStore();
  const { authData } = useAuthStore();
  // const { user } = useAuthStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Filter projects based on user role
  // const userProjects =
  //   user?.role === "admin"
  //     ? projects
  //     : projects.filter((project) => project.members.includes(user?.id || ""));

  // Get recent projects (last 3)
  // const recentProjects = [...userProjects]
  //   .sort(
  //     (a, b) =>
  //       new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  //   )
  //   .slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {authData?.name}
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your projects today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
            <div className="p-2 bg-blue-100 rounded-full">
              <Code2 className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {/* {userProjects.length} */}
          </div>
          <p className="text-gray-600 text-sm mt-1">Active projects</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Today</h2>
            <div className="p-2 bg-green-100 rounded-full">
              <Calendar className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {format(new Date(), "MMM d, yyyy")}
          </div>
          <p className="text-gray-600 text-sm mt-1">Current date</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
            <div className="p-2 bg-purple-100 rounded-full">
              <MessageSquare className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">24</div>
          <p className="text-gray-600 text-sm mt-1">AI interactions today</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Projects
          </h2>
          <Link
            to="/projects"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            View all
          </Link>
        </div>

        {/* {isLoading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading projects...</p>
          </div>
        ) : recentProjects.length > 0 ? (
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">{project.name}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>
                      {format(new Date(project.updatedAt), "MMM d, yyyy")}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-1">
                  {project.description}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No projects found.</p>
            <Link
              to="/projects"
              className="mt-2 inline-block text-blue-600 hover:text-blue-800"
            >
              Create your first project
            </Link>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Dashboard;
