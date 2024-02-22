import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie"
import { useCookies } from 'react-cookie';

const LoginForm: React.FC = () => {
  const router = useRouter();
  // const [cookie, setCookie] = useCookies(['userData']);
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const onSubmit = async (values: typeof initialValues) => {
    try {
      const response = await axios.post('http://localhost:3001/auth/login',values)
      console.log(response.data);
      if(response.status === 201){
        Cookies.set('userData', JSON.stringify(response.data));
        // setCookie('userData',response.data, { path: '/' });
        console.log("sdfgdgdf",response.data);
        toast.success(response.data.message)
        router.push('/');
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
        <div className="md:w-1/2">
          <div className="hidden md:block mt-8">
            <img src="assets/Mobile login-cuate.svg" alt="Image Description" />
          </div>
        </div>
        <div className="md:w-1/2 p-8 bg-white shadow-xl rounded-lg lg:w-1/3">
        <h2 className="text-3xl font-semibold text-gray-800 text-center">
        Log In

          </h2>
          <p className="text-gray-600 mt-4 text-center mb-4">
            Join our community to access exclusive content and features.
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
            <div>
              <label className="block text-gray-700 text-sm font-semibold">
                Password
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
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
            <div className="">
              <div className="text-gray-700 text-sm font-semibold pb-3">
                <Link href="/forgot-password"
                   className="text-green-500 hover:underline font-semibold">Forgot Password?
                </Link>
              </div>
              <button
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
                type="submit"
              >
                Log In
              </button>
            </div>
            <div className="text-gray-700 text-sm font-semibold mt-2 text-center">
            Don't have an account?{" "}
              <Link href="/signup"
                className="text-green-500 hover:underline font-semibold">Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>{" "}
    </div>
  );
};

export default LoginForm;
