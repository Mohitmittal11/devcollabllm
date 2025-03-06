import { Mail, Save, User } from "lucide-react";
import React, { useState } from "react";
// import { useAuthStore } from '../store/authStore';
// import { User, Mail, Save } from "lucide-react";

const Profile: React.FC = () => {
  // const { user, updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  // const [formData, setFormData] = useState({
  //   name: user?.name || "",
  //   email: user?.email || "",
  // });
  const [isLoading, setIsLoading] = useState(false);
  // const [successMessage, setSuccessMessage] = useState("");

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // setSuccessMessage("");

    // try {
    //   await updateProfile({
    //     name: formData.name,
    //   });

    //   setSuccessMessage("Profile updated successfully");
    //   setIsEditing(false);
    // } catch (error) {
    //   console.error("Failed to update profile:", error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  // if (!user) {
  //   return (
  //     <div className="text-center py-12">
  //       <p className="text-gray-500">Loading profile...</p>
  //     </div>
  //   );
  // }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>

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
                {/* {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={`${user.name}'s avatar`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300">
                    <User className="h-16 w-16 text-gray-500" />
                  </div>
                )} */}
              </div>

              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  {/* {user.name} */}
                  Mohit
                </h2>
                <p className="text-gray-600">Admin</p>
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
                          // value={formData.name}
                          // onChange={handleChange}
                          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
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
                          // value={formData.email}
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
                          // setIsEditing(false);
                          // setFormData({
                          //   name: user.name,
                          //   email: user.email,
                          // });
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
                    <p className="text-gray-900">Mohit</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Email
                    </h3>
                    <p className="text-gray-900">mittalm904@gmail.com</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Role
                    </h3>
                    <p className="text-gray-900 capitalize">Admin</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
