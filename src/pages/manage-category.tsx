import { useRouter } from "next/router";
import React, { useRef, useState, useEffect } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Formik, useFormik, yupToFormErrors } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";
import AuthAndRoleCheck from "@/components/AuthAndRoleCheck";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
const Category: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [editCatId, seteditCatId] = useState<string>("");
  const [editkro, seteditkro] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  let [userData, setUserData] = useState<UserData>(); // You can initialize it with an empty object

  interface UserData {
    message: string;
    token: string;
    user: {
      email: string;
      password: string;
      role: string;
      username: string;
      __v: number;
      _id: string;
    };
  }
  useEffect(() => {
    userData = JSON.parse(Cookies.get("userData") || "{}");
    console.log(userData);
    setUserData(userData)
    getAllCategory();

  }, [Cookies.get("userData")]);

  const router = useRouter();
  const handleCancel = () => {
    router.push("/");
  };
  interface MyFormValues {
    category: string;
  }
  interface Category {
    category: string;
    _id: string;
  }
  const initialValues: MyFormValues = {
    category: "",
  };
  const postSchema = yup.object().shape({
    category: yup.string().required("Category is required"),
  });
  

  const getAllCategory = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "https://blogcrudapp.vercel.app/category/all",
        headers: {
          // "Content-Type": `multipart/form-data`,
          Authorization: `Bearer ${userData?.token}`,
        },
        data: values,
      });      setCategories(response.data);
    } catch (error:any) {
      toast.error(error.response?.data?.message);

      console.log(error);
    }
  };
  const deleteCategory = async (id: string) => {
    // Show a confirmation dialog using SweetAlert
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this category. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
    });
  
    if (result.isConfirmed) {
      try {
        const response = await axios({
          method: 'delete',
          url: `https://blogcrudapp.vercel.app/category/${id}`,
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
          data: values,
        });
  
        // Check if the deletion was successful
        if (response.status === 200) {
          
          // Show a success message using SweetAlert
          Swal.fire('Deleted!', 'The category has been deleted.', 'success');
          // Refresh the category list
          getAllCategory();
        } else {
          // Show an error message using SweetAlert
          Swal.fire('Error', 'An error occurred while deleting category.', 'error');
        }
      } catch (error) {
        // Show an error message using SweetAlert
        Swal.fire('Error', 'An error occurred while deleting the category.', 'error');
      }
    }
  };
  // const updateCategory = async (id: string) => {
  //   const response = await axios.put(
  //     `http://localhost:3001/category/${id}`,
  //     {}
  //   );
  // };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: postSchema,
    onSubmit: async (values, action) => {
      setLoading(true);

      try {
        if (editkro) {
          let res = await axios({
            method: "put",
            url: `https://blogcrudapp.vercel.app/category/${editCatId}`,
            headers: {
              // "Content-Type": `multipart/form-data`,
              Authorization: `Bearer ${userData?.token}`,
            },
            data: values,
          });
          if (res.data) {
            toast.success(res.data.message);
            getAllCategory();
            seteditkro(false);

            seteditCatId("");
            // values.category = ""
            action.resetForm();
            setFieldValue("category", "");

            // router.push("/");
          }
        } else {
          let res = await axios({
            method: "post",
            url: "https://blogcrudapp.vercel.app/category/create",
            headers: {
              // "Content-Type": `multipart/form-data`,
              Authorization: `Bearer ${userData?.token}`,
            },
            data: values,
          });
          if (res.data) {
            getAllCategory();
            action.resetForm();
            setFieldValue("category", "");
            
            // router.push("/");
          }if(res.status === 201){

            toast.success("Category created");
          }
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    },
  });
  const handleEdit = (id: string, category: string) => {
    seteditkro(true);
    seteditCatId(id);
    values.category = category;
  };
  return (
    <div className=" min-h-screen max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-500 mb-4 mt-8 text-center">
        Manage Category
      </h1>

      <p className="text-gray-500 text-sm md:text-lg text-center">
        You can create and manage and delete and update youe categories here.
      </p>

      <form
        className=" bg-white rounded-lg md:shadow-xl  md:p-8"
        onSubmit={handleSubmit}
      >
        {!editkro ? (
          <h1 className="text-lg md:text-2xl font-semibold text-gray-500 mb-2 mt-2 md:mt-0  md:mb-4 ">
            Add Category
          </h1>
        ) : (
          <h1 className="text-lg md:text-2xl font-semibold text-gray-500 mb-2 md:mb-4 ">
            Edit Category
          </h1>
        )}

        <label
          htmlFor="Category"
          className="block text-gray-700 text-sm font-semibold"
        >
          Category
        </label>
        <input
          type="text"
          id="category"
          value={values.category}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`input ${
            errors.category && touched.category
              ? "border-red-500"
              : "focus:border-green-500"
          }`}
          placeholder="Enter category title"
        />
        {errors.category && touched.category ? (
          <div className="error">{errors.category}</div>
        ) : null}

        <div className="flex flex-col md:flex-row gap-3 mt-4">
          <button type="button" className="btn-empty " onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="btn">
            {editkro ? "Edit Category" : "Create Category"}
          </button>
        </div>
        <h1 className="text-lg md:text-2xl font-semibold text-gray-500 mb-6 mt-6 ">
          Manage Category
        </h1>
        <div className=" overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 capitalize">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Category Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, index) => {
                if (index % 2 === 0) {
                  var className1 =
                    "bg-white border-b dark:bg-gray-900 dark:border-gray-700";
                } else
                  className1 =
                    "border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700";
                return (
                  <>
                    <tr className={className1}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {cat.category}
                      </th>

                      <td className="px-6 py-4 flex gap-3 cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-green-500"
                          onClick={() => {
                            handleEdit(cat._id, cat.category);
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-red-500 "
                          onClick={() => deleteCategory(cat._id)}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default AuthAndRoleCheck(Category, ["admin"]);
