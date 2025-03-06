/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useAdminStore } from "../store/adminStore";
// import { User } from "../types";
import {
  Plus,
  Trash,
  Edit,
  Check,
  Copy,
  Mail,
  User as UserIcon,
} from "lucide-react";

const AdminDevelopers: React.FC = () => {
  const {
    developers,
    fetchDevelopers,
    addDeveloper,
    updateDeveloper,
    deleteDeveloper,
    isLoading,
  } = useAdminStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newDeveloper, setNewDeveloper] = useState({
    email: "",
    name: "",
  });
  const [editDeveloper, setEditDeveloper] = useState<any>(null);
  const [deleteDeveloperData, setDeleteDeveloperData] = useState<any>(null);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [passwordCopied, setPasswordCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchDevelopers();
  }, [fetchDevelopers]);

  // Filter developers based on search term
  const filteredDevelopers: any = developers.filter(
    (dev: any) =>
      dev.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dev.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDeveloper = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newDeveloper.email.trim() === "" || newDeveloper.name.trim() === "")
      return;

    try {
      const result = await addDeveloper(newDeveloper.email, newDeveloper.name);
      setGeneratedPassword(result.password);
      setNewDeveloper({ email: "", name: "" });
    } catch (error) {
      console.error("Failed to add developer:", error);
    }
  };

  const handleUpdateDeveloper = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editDeveloper || editDeveloper.name.trim() === "") return;

    try {
      await updateDeveloper(editDeveloper.id, {
        name: editDeveloper.name,
      });

      setShowEditModal(false);
      setEditDeveloper(null);
    } catch (error) {
      console.error("Failed to update developer:", error);
    }
  };

  const handleDeleteDeveloper = async () => {
    if (!deleteDeveloperData) return;

    try {
      await deleteDeveloper(deleteDeveloperData?.id);
      setShowDeleteModal(false);
      setDeleteDeveloperData(null);
    } catch (error) {
      console.error("Failed to delete developer:", error);
    }
  };

  const copyPasswordToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword);
    setPasswordCopied(true);
    setTimeout(() => setPasswordCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Manage Developers</h1>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search developers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Developer
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading developers...</p>
        </div>
      ) : filteredDevelopers.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Developer
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDevelopers.map((developer: any) => (
                <tr key={developer?.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {developer?.avatar ? (
                          <img
                            src={developer?.avatar}
                            alt={`${developer.name}'s avatar`}
                            className="h-10 w-10 rounded-full"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <UserIcon className="h-5 w-5 text-gray-500" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {developer.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {developer.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => {
                        setEditDeveloper(developer);
                        setShowEditModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        setDeleteDeveloperData(developer);
                        setShowDeleteModal(true);
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <UserIcon className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            No developers found
          </h2>
          <p className="text-gray-600 mb-6">
            {searchTerm
              ? "Try adjusting your search terms"
              : "Get started by adding your first developer"}
          </p>
          {!searchTerm && (
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Developer
            </button>
          )}
        </div>
      )}

      {/* Add Developer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Add New Developer
            </h2>

            {generatedPassword ? (
              <div>
                <div className="mb-6 bg-green-50 p-4 rounded-md">
                  <p className="text-green-700 font-medium mb-2">
                    Developer added successfully!
                  </p>
                  <p className="text-gray-700 mb-2">
                    Please share these credentials with the developer:
                  </p>

                  <div className="bg-gray-100 p-3 rounded-md mb-3">
                    <p className="text-sm text-gray-700 mb-1">
                      <span className="font-medium">Email:</span>{" "}
                      {newDeveloper.email}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Password:</span>{" "}
                        {generatedPassword}
                      </p>
                      <button
                        onClick={copyPasswordToClipboard}
                        className="text-blue-600 hover:text-blue-800"
                        aria-label="Copy password"
                      >
                        {passwordCopied ? (
                          <Check size={16} />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500">
                    Note: This password will not be shown again. Make sure to
                    copy it now.
                  </p>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setGeneratedPassword("");
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleAddDeveloper}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      id="name"
                      type="text"
                      value={newDeveloper.name}
                      onChange={(e) =>
                        setNewDeveloper({
                          ...newDeveloper,
                          name: e.target.value,
                        })
                      }
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter developer name"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      id="email"
                      type="email"
                      value={newDeveloper.email}
                      onChange={(e) =>
                        setNewDeveloper({
                          ...newDeveloper,
                          email: e.target.value,
                        })
                      }
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter developer email"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Add Developer
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Edit Developer Modal */}
      {showEditModal && editDeveloper && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Edit Developer
            </h2>

            <form onSubmit={handleUpdateDeveloper}>
              <div className="mb-4">
                <label
                  htmlFor="edit-name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    id="edit-name"
                    type="text"
                    value={editDeveloper.name}
                    onChange={(e) =>
                      setEditDeveloper({
                        ...editDeveloper,
                        name: e.target.value,
                      })
                    }
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter developer name"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="edit-email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    id="edit-email"
                    type="email"
                    value={editDeveloper.email}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
                    disabled
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Email cannot be changed
                </p>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditDeveloper(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Developer Modal */}
      {showDeleteModal && deleteDeveloperData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Delete Developer
            </h2>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium">{deleteDeveloperData.name}</span>?
              This action cannot be undone.
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteDeveloperData(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteDeveloper}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDevelopers;
