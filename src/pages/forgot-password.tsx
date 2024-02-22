import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";

const ForgotPassword: React.FC = () => {
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const onSubmit = (values: { email: string }) => {
    // In a real application, you would send a password reset email to the provided email address.
    // You can make an API request to your server for this purpose.
    console.log("Reset password email sent to:", values.email);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
      <div className="h-[92vh] flex flex-col md:flex-row justify-center md:justify-between items-center">
        <div className="md:w-1/2">
          <div className="hidden md:block mt-8">
            <img src="assets/Forgot password-cuate.svg" alt="Image Description" />
          </div>
        </div>
        <div className="md:w-1/2 p-8 bg-white shadow-xl rounded-lg lg:w-1/3">
         
        <h2 className="text-3xl font-semibold text-gray-800 text-center">
        Forgot Password
          </h2>
          <p className="text-gray-600 mt-4 text-center mb-4">
          Password reset instructions will be sent to your email.
          </p>
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <div>
              <label className="block text-gray-700 text-sm font-semibold">
                Email
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
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
            {/* <div className="text-gray-700 text-sm font-semibold pb-3">
              <Link
                href="/forgot-password"
                className="text-green-500 hover:underline font-semibold"
              >
                Forgot Password?
              </Link>
            </div> */}
            <button
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
              type="submit"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
