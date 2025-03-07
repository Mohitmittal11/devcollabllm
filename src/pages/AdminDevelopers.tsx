import React, { useCallback, useEffect, useState } from "react";
import { Edit, Plus, Trash, UserIcon } from "lucide-react";
import AddDeveloper from "../components/modal/addDeveloper";
import { ListUser, userDetails } from "../lib/Admin/user";
import { UserInterface } from "../ts/Interfaces/User";
import DeleteDeveloper from "../components/modal/DeleteDeveloper";

const AdminDevelopers: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [userList, setUserList] = useState<UserInterface[]>([]);
  const [details, setDetails] = useState<UserInterface | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deleteUserId, setDeleteUserId] = useState<string>("");

  useEffect(() => {
    fetchDevelopers();
  }, []);

  const fetchDevelopers = async () => {
    try {
      const res = await ListUser();
      if (res.code == 200) {
        setUserList(res.data.response);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error os ", error);
      setIsLoading(false);
    }
  };

  const handelDetails = async (id: string) => {
    try {
      const res = await userDetails(id);
      if (res.code == 200) {
        setDetails(res);
        setShowAddModal(true);
      }
    } catch (error) {
      console.log("Error is ", error);
    }
  };
  const handleDeleteUser = (id: string) => {
    setDeleteUserId(id);
    setShowDeleteModal(true);
  };
  const fetchData = useCallback(() => {
    fetchDevelopers();
  }, []);

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
              disabled={userList.length ? false : true}
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
      ) : userList.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm overflow-auto">
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
              {userList.map((developer: UserInterface) => (
                <tr key={developer?._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {developer?.image ? (
                          <img
                            src={developer?.image}
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
                        handelDetails(developer._id);
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        handleDeleteUser(developer._id);
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
        <AddDeveloper
          setShowAddModal={setShowAddModal}
          showAddModal={showAddModal}
          fetchData={fetchData}
          details={details}
          setDetails={setDetails}
        />
      )}

      {showDeleteModal && (
        <DeleteDeveloper
          setShowDeleteModal={setShowDeleteModal}
          deleteUserId={deleteUserId}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default AdminDevelopers;
