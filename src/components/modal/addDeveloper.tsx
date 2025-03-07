/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { Check, Copy, Mail, UserIcon } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { addDeveloperValidationSchema } from "../../Utils/genrateValidationSchema";
import { addUser, editUser } from "../../lib/Admin/user";
import { RegisterUser, UserInterface } from "../../ts/Interfaces/User";
interface AddDeveloperProps {
  setShowAddModal: (isShowModal: boolean) => void;
  showAddModal: boolean;
  fetchData: () => void;
  details?: UserInterface | null;
  setDetails: (user: UserInterface | null) => void;
}

const AddDeveloper: React.FC<AddDeveloperProps> = ({
  setShowAddModal,
  showAddModal,
  fetchData,
  details,
  setDetails,
}) => {
  const [generatedPassword, setGeneratedPassword] = useState<string>("");
  const [passwordCopied, setPasswordCopied] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [registerUserDetails, setRegisterUserDetails] =
    useState<RegisterUser>();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema: addDeveloperValidationSchema(),
    onSubmit: async (values: { name: string; email: string }) => {
      try {
        setIsLoading(true);
        if (details?.name) {
          updateDeveloper(details?._id, values);
        } else {
          AddDeveloper(values);
        }
      } catch (error) {
        console.log("error is ", error);
      }
    },
  });

  const AddDeveloper = async (value: { name: string; email: string }) => {
    try {
      const res = await addUser(value);
      if (res.code == 201) {
        setRegisterUserDetails(res.data);
        setGeneratedPassword(res.data.password);
        setDetails?.(null);
        setIsLoading(false);
        fetchData();
      }
    } catch (error) {
      console.log("error is ", error);
      setIsLoading(false);
    }
  };
  const updateDeveloper = async (
    id: string,
    value: { name: string; email: string }
  ) => {
    try {
      const res = await editUser(id, value);
      if (res.code == 200) {
        setIsLoading(false);
        setShowAddModal(false);
        setDetails(null);
        fetchData();
      }
    } catch (error) {
      console.log("error os ", error);
    }
  };

  const copyPasswordToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword);
    setPasswordCopied(true);
    setTimeout(() => setPasswordCopied(false), 2000);
  };

  const handleCancel = () => {
    setDetails(null);
    setShowAddModal(false);
  };

  const { handleSubmit, setFieldValue, values, errors, touched } = formik;

  useEffect(() => {
    if (details?.name) {
      setFieldValue("name", details?.name);
      setFieldValue("email", details?.email);
    }
  }, [details]);

  return (
    <Fragment>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
          showAddModal ? "block" : "hidden"
        }`}
      >
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {details?.name ? "Update Developer" : "Add New Developer"}
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
                    {registerUserDetails?.email}
                  </p>
                  <div className="flex items-center gap-5 overflow-x-auto break-all">
                    <p className="text-sm text-gray-700 ">
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
                  Note: This password will not be shown again. Make sure to copy
                  it now.
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    // setGeneratedPassword("");
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
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
                    value={values.name}
                    onChange={(e) =>
                      setFieldValue("name", e.target.value.trimStart())
                    }
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter developer name"
                  />
                </div>
                {errors.name && touched.name && (
                  <p className="text-red-500 text-xs text-start mt-2">
                    {" "}
                    {errors.name}
                  </p>
                )}
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
                    value={values.email}
                    onChange={(e) =>
                      setFieldValue("email", e.target.value.trimStart())
                    }
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter developer email"
                    disabled={details?.email ? true : false}
                  />
                </div>
                {errors.email && touched.email && (
                  <p className="text-red-500 text-xs text-start mt-2">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => handleCancel()}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  {!isLoading && details?.name
                    ? "Update Developer"
                    : isLoading && details?.name
                    ? "Updating Developer"
                    : isLoading && !details?.name
                    ? "Adding Developer"
                    : "Add Developer"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default AddDeveloper;
