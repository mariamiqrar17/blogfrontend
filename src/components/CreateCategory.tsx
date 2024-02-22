import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Formik, useFormik, yupToFormErrors } from "formik";
import * as yup from "yup"
import axios from "axios";
import { toast } from "react-hot-toast";

const CreateCategory: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    
    const router = useRouter();
    const handleCancel = () => {
        router.push("/");
    };
    interface MyFormValues {
      category: string;
    }
    
  const initialValues: MyFormValues = {
    category: "",
  };
  const postSchema = yup.object().shape({
    category: yup.string().required("Category is required"),
  });
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
      console.log("salweew", values);

      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWF0IjoxNjkzMjIyMTc3LCJleHAiOjE2OTMzMDg1Nzd9.-B-juZYi9W7FHRlpL8YwqLAm0og2MUgb4QKHfANxbeQ";
      try {
        let res = await axios({
          method: "post",
          url: "https://blogbackend-ten.vercel.app/category/create",
          headers: {
            // "Content-Type": `multipart/form-data`,
            Authorization: `Bearer ${token}`,
          },
          data: values,
        });
        if (res.status === 201) {
          toast.success("Category created");
          action.resetForm();
          // router.push("/");
        }
      } catch (error: any) {
        console.log("error::", error.response?.data?.message);
        toast.error(error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <div className="">
      <form
        className=" bg-white rounded-lg shadow-xl p-8"
        onSubmit={handleSubmit}
      >
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
            Create Category
          </button>
        </div>
      </form>
 
    </div>
  );
};
export default CreateCategory;
