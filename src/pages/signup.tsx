import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const SignUpForm: React.FC = () => {
  const router = useRouter();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"),], "Passwords must match")
      .required("Confirm Password is required"),
    role: Yup.string().required("Role is required"),
  });

  const onSubmit = async (values: typeof initialValues) => {

  
    try {
      const response = await axios.post('https://blogcrudapp.vercel.app/auth/signup',values)
      if(response.status === 201){
        toast.success(response.data.message)
        router.push('/login');

        

      }
    
      
    } catch (error:any) {
      toast.error(error.response.data.message)

      
      
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
      <div className="h-[92vh] flex flex-col md:flex-row justify-center md:justify-between items-center">
        <div className="md:w-1/2 ">
          <div className="hidden md:block mt-8">
            <img src="/assets/login-image.svg" alt="Image Description" />
          </div>
        </div>
        <div className="md:w-1/2 p-8 bg-white shadow-xl rounded-lg lg:w-1/3">
          <h2 className="text-3xl font-semibold text-gray-800 text-center">
            Sign Up
          </h2>
          <p className="text-gray-600 mt-4 text-center mb-4">
            Join our community to access exclusive content and features.
          </p>
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <div>
              <label className="block text-gray-700 text-sm font-semibold">
                Username
              </label>
              <input
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none ${
                  formik.touched.username && formik.errors.username
                    ? "border-red-500"
                    : "focus:border-blue-600"
                }`}
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-red-500 text-sm font-semibold">
                  {formik.errors.username}
                </div>
              ) : null}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold">
                Email
              </label>
              <input
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "focus:border-blue-600"
                }`}
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm font-semibold">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold">
                Password
              </label>
              <input
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "focus:border-blue-600"
                }`}
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm font-semibold">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold">
                Confirm Password
              </label>
              <input
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none ${
                  formik.touched.confirmPassword && formik.errors.confirmPassword
                    ? "border-red-500"
                    : "focus:border-blue-600"
                }`}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className="text-red-500 text-sm font-semibold">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
            <div className="flex items-center space-x-4">
              <label className="text-gray-700 text-sm font-semibold">
                Role
              </label>
              <div className="flex items-center space-x-2">
                <label className="flex items-center space-x-1 text-sm">
                  <input
                    type="radio"
                    className="form-radio text-green-500"
                    name="role"
                    value="writer"
                    checked={formik.values.role === "writer"}
                    onChange={formik.handleChange}
                  />
                  <span className="text-gray-700">Writer</span>
                </label>
                <label className="flex items-center space-x-1 text-sm">
                  <input
                    type="radio"
                    className="form-radio text-green-500"
                    name="role"
                    value="reader"
                    checked={formik.values.role === "reader"}
                    onChange={formik.handleChange}
                  />
                  <span className="text-gray-700">Reader</span>
                </label>
              </div>
              {formik.touched.role && formik.errors.role ? (
                <div className="text-red-500 text-sm font-semibold">
                  {formik.errors.role}
                </div>
              ) : null}
            </div>
            <div>
              <button
                className="w-full bg-blue-600 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
                type="submit"
              >
                Sign Up
              </button>
            </div>
            <div className="text-gray-700 text-sm font-semibold mt-2 text-center">
              Already have an account?{" "}
              <Link href="/login"
                className="text-blue-700 hover:underline font-semibold">Log in
              </Link>
            </div>

          </form>
        </div>
      </div>{" "}
    </div>
  );
};

export default SignUpForm;
