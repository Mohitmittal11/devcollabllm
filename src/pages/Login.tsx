/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Code2 } from "lucide-react";
import { loginValidationSchema } from "../Utils/genrateValidationSchema";
import { AdminLogin } from "../lib/Admin/auth";

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema(),
    onSubmit: async (values: { email: string; password: string }) => {
      try {
        setIsLoading(true);
        const data = await AdminLogin(values);
        if (data.code === 200) {
          navigate("/dashboard");
        }
        setIsLoading(false);
      } catch (error: any) {
        console.log("Error is ", error);
        setError(error.response.data.message);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const { errors, touched, handleSubmit, setFieldValue, values } = formik;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-900 p-6 flex justify-center">
          <div className="flex items-center space-x-2">
            <Code2 className="h-10 w-10 text-blue-400" />
            <h1 className="text-2xl font-bold text-white">DevCollab AI</h1>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back
          </h2>
          <p className="text-gray-600 mb-6">Sign in to your account</p>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={(e) =>
                  setFieldValue("email", e.target.value.trimStart())
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.code === "Space" && !e.currentTarget.value) {
                    e.preventDefault();
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
              {errors.email && touched.email && (
                <p className="text-red-500 text-xs text-start mt-2">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={isPasswordShow ? "text" : "password"}
                  name="password"
                  value={values.password}
                  onChange={(e) =>
                    setFieldValue("password", e.target.value.trimStart())
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
                {values.password && (
                  <div
                    onClick={() => setIsPasswordShow(!isPasswordShow)}
                    className="w-5 h-5 absolute top-3 right-4 cursor-pointer"
                  >
                    {isPasswordShow ? (
                      <img src="/images/eye-slash.svg" alt="eyeImage" />
                    ) : (
                      <img src="/images/eye.svg" alt="eyeImage" />
                    )}
                  </div>
                )}
              </div>
              {errors.password && touched.password && (
                <p className="text-red-500 text-xs text-start mt-2">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
