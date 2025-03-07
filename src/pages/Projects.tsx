/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Calendar, Plus, Search, Users } from "lucide-react";
import { projectValidationSchema } from "../Utils/genrateValidationSchema";
import { addProject, projectList } from "../lib/Project";
import { toast } from "react-toastify";
import { Project } from "../ts/Interfaces/Project";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Pagination from "../components/Pagination";

const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [project, setProject] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isProjectAdding, setIsProjectAdding] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const perPage = 9;

  useEffect(() => {
    fetchProject({ page: page, perPage: perPage, search: searchTerm });
  }, [page]);

  const fetchProject = async (data?: {
    page?: number;
    perPage?: number;
    search?: string;
  }) => {
    try {
      const response = await projectList({
        search: data?.search || "",
        page: data?.page || 1,
        perPage: data?.perPage || 9,
      });
      if (response.code == 200) {
        setProject(response.data.response);
        setTotalCount(response.data.Total);
        setIsLoading(false);
      }
    } catch (error: any) {
      if (error.response.data.code == 400) {
        setProject([]);
      }
      setIsLoading(false);
      console.log("error is ", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: projectValidationSchema(),
    onSubmit: async (values: { name: string; description: string }) => {
      try {
        setIsProjectAdding(true);
        let bodydata: any = { name: values.name };
        if (values.description) {
          bodydata = { ...bodydata, description: values.description };
        }
        const res = await addProject(bodydata);
        if (res.code == 201) {
          await fetchProject({
            page: page,
            perPage: perPage,
          });
          setShowCreateModal(false);
          resetForm();
          setIsProjectAdding(false);
          toast.success("Project Added Successfully");
        }
      } catch (error: any) {
        setIsProjectAdding(false);
        toast.error(error.response.data.message);
      }
    },
  });

  const { handleSubmit, errors, touched, setFieldValue, resetForm, values } =
    formik;

  const handlePageClick = useCallback((page: { selected: number }) => {
    setPage(page.selected + 1);
  }, []);

  return (
    <Fragment>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.code == "Space" && !searchTerm) {
                    return;
                  } else if (e.code == "Enter") {
                    fetchProject({
                      page: 1,
                      perPage: perPage,
                      search: searchTerm,
                    });
                    setPage(1);
                  }
                }}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              disabled={isLoading ? true : false}
              className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading projects...</p>
          </div>
        ) : project.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.map((project) => (
              <Link
                key={project._id}
                to={`/projects/${project._id}`}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {project.name}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        {format(new Date(project.createdAt), "MMM d, yyyy")}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{project.members.length} members</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-medium text-gray-900 mb-2">
              No projects found
            </h2>
            <p className="text-gray-600 mb-6">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Get started by creating your first project"}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Project
              </button>
            )}
          </div>
        )}

        {/* Create Project Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Create New Project
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Project Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={values.name}
                    onChange={(e) => setFieldValue("name", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter project name"
                  />
                  {errors.name && touched.name && (
                    <p className="text-red-500 text-left text-xs mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={values.description}
                    onChange={(e) =>
                      setFieldValue("description", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter project description"
                    rows={3}
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    {isProjectAdding ? "Creating Project" : "Create Project"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      {totalCount > perPage && (
        <Pagination
          totalCount={totalCount}
          perPage={perPage}
          handlePageClick={handlePageClick}
          page={page}
        />
      )}
    </Fragment>
  );
};

export default Projects;
