import React, { useState } from "react";
import { useFormik } from "formik";
// import { useAuthStore } from "../store/authStore";
import { Lock, Save } from "lucide-react";
import { PasswordValidationSchema } from "../Utils/genrateValidationSchema";
import { ChangePassword } from "../lib/Admin/auth";

const Settings: React.FC = () => {
  // const { changePassword } = useAuthStore();
  // const [formData, setFormData] = useState({
  //   currentPassword: "",
  //   newPassword: "",
  //   confirmPassword: "",
  // });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setSuccessMessage("");
  //   setErrorMessage("");

  //   // Validate passwords match
  //   if (formData.newPassword !== formData.confirmPassword) {
  //     setErrorMessage("New passwords do not match");
  //     setIsLoading(false);
  //     return;
  //   }

  //   // Validate password strength
  //   if (formData.newPassword.length < 8) {
  //     setErrorMessage("Password must be at least 8 characters long");
  //     setIsLoading(false);
  //     return;
  //   }

  //   try {
  //     // await changePassword(formData.currentPassword, formData.newPassword);

  //     setSuccessMessage("Password changed successfully");
  //     setFormData({
  //       currentPassword: "",
  //       newPassword: "",
  //       confirmPassword: "",
  //     });
  //   } catch (error) {
  //     console.log("error", error);
  //     setErrorMessage(
  //       "Failed to change password. Please check your current password."
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: PasswordValidationSchema(),
    onSubmit: async (values: {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    }) => {
      setIsLoading(true);
      const bodyData = {
        newPassword: values.confirmPassword,
        password: values.currentPassword,
      };
      const res = await ChangePassword(bodyData);
      if (res.code == 200) {
        setSuccessMessage("Password Updated Successfully");
        console.log("Hello");
        resetForm();
        setIsLoading(false);
      }
      console.log("responseof change password is ", res);
    },
  });
  const { handleSubmit, errors, touched, setFieldValue, resetForm, values } =
    formik;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Settings</h1>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Change Password
            </h2>

            {successMessage && (
              <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-md">
                {successMessage}
              </div>
            )}

            {/* {errorMessage && (
              <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-md">
                {errorMessage}
              </div>
            )} */}

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Current Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={values.currentPassword}
                      onChange={(e) =>
                        setFieldValue("currentPassword", e.target.value)
                      }
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {errors.currentPassword && touched.currentPassword && (
                    <p className="text-red-500 text-xs text-start mt-2">
                      {errors.currentPassword}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      id="newPassword"
                      name="newPassword"
                      value={values.newPassword}
                      type="password"
                      onChange={(e) =>
                        setFieldValue("newPassword", e.target.value)
                      }
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {errors.newPassword && touched.newPassword && (
                    <p className="text-red-500 text-xs text-start mt-2">
                      {errors.newPassword}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      type="password"
                      onChange={(e) =>
                        setFieldValue("confirmPassword", e.target.value)
                      }
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="text-red-500 text-xs text-start mt-2">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? (
                      "Changing Password..."
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Change Password
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Notification Settings
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Email Notifications
                  </h3>
                  <p className="text-sm text-gray-500">
                    Receive email notifications for project updates
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Project Invitations
                  </h3>
                  <p className="text-sm text-gray-500">
                    Receive notifications for new project invitations
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    AI Suggestions
                  </h3>
                  <p className="text-sm text-gray-500">
                    Receive AI-powered suggestions for your projects
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Settings;
