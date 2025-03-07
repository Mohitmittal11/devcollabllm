import { Mail, Save, User } from "lucide-react";
import React, { Fragment, useEffect, useState } from "react";
import { AdminDetailsInterface } from "../ts/Interfaces/Admin/auth";
import { Details, UpdateProfile } from "../lib/Admin/auth";

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState<boolean>(true);
  const [details, setDetails] = useState<AdminDetailsInterface>();
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");

  useEffect(() => {
    getAdminDetails();
  }, []);
  const getAdminDetails = async () => {
    try {
      const res = await Details();
      if (res.code == 200) {
        setName(res?.name);
        setDetails(res);
        setIsProfileLoading(false);
      }
    } catch (error) {
      console.log("Error is ", error);
    }
  };

  useEffect(() => {
    if (!name) {
      setNameError("Please Enter Name");
    } else {
      setNameError("");
    }
  }, [name]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nameError) {
      return;
    } else {
      try {
        setIsLoading(true);
        const res = await UpdateProfile({ name: name });
        if (res.code == 200) {
          await getAdminDetails();
          setIsLoading(false);
          setIsEditing(false);
        }
      } catch (error) {
        console.log("error is ", error);
      }
    }
  };

  return (
    <Fragment>
      {isProfileLoading ? (
        <p className="text-center text-2xl font-semibold text-gray-900">
          Loading...
        </p>
      ) : (
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <h1 className="text-2xl font-bold text-gray-900">
                  Your Profile
                </h1>

                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              {/* {successMessage && (
            <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-md">
              {successMessage}
            </div>
          )} */}

              <div className="flex flex-col sm:flex-row gap-8">
                <div className="sm:w-1/3 flex flex-col items-center">
                  <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden mb-4">
                    <img
                      src={
                        details?.image ||
                        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80"
                      }
                      alt={`${details?.name}'s avatar`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {details?.name}
                    </h2>
                    <p className="text-gray-600">
                      {details?.role == "Admin" ? "Admin" : "User"}
                    </p>
                  </div>
                </div>

                <div className="sm:w-2/3">
                  {isEditing ? (
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Name
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                              id="name"
                              name="name"
                              type="text"
                              value={name}
                              onChange={(e) => {
                                setName(e.target.value);
                              }}
                              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>
                          <p className="text-red-500 text-xs text-start mt-2">
                            {nameError}
                          </p>
                        </div>

                        <div>
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
                              name="email"
                              type="email"
                              value={details?.email}
                              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
                              disabled
                            />
                          </div>
                          <p className="mt-1 text-xs text-gray-500">
                            Email cannot be changed
                          </p>
                        </div>

                        <div className="flex justify-end space-x-3 pt-4">
                          <button
                            type="button"
                            onClick={() => {
                              setIsEditing(false);
                            }}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={isLoading}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                          >
                            {isLoading ? (
                              "Saving..."
                            ) : (
                              <>
                                <Save className="h-4 w-4 mr-2" />
                                Save Changes
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">
                          Name
                        </h3>
                        <p className="text-gray-900">{details?.name}</p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">
                          Email
                        </h3>
                        <p className="text-gray-900">{details?.email}</p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">
                          Role
                        </h3>
                        <p className="text-gray-900 capitalize">
                          {details?.role == "Admin" ? "Admin" : "User"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Profile;
