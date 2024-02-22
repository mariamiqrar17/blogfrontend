import { useRouter } from "next/router";
import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { convertFromHTML, convertToHTML } from "draft-convert";
import { Formik, useFormik, yupToFormErrors } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
interface MyFormValues {
  title: string;
  thumbnail: string;
  description: string;
  category: string;
}
interface Category {
  category: string;
  _id: string;
}
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

interface Propstype {
  blog?: Blog;
  isEdit?: boolean;
}

interface Blog {
  createdAt: string;
  description: string;
  thumbnail: string;
  title: string;
  updatedAt: string;
  user: {
    email: string;
    password: string;
    role: string;
    username: string;
  };
  _id: string;
}

const CreateBlog: React.FC<Propstype> = ({ blog, isEdit = false }) => {
  // console.log(isEdit, blog);

  const [categories, setCategories] = useState<Category[]>([]);
  let [userData, setUserData] = useState<UserData>();

  const [thumbnail, setThumbnail] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const blogBody = useRef();
  const handleThumbnailChange = (event: any) => {
    const selectedFile = event.target.files[0];
    setThumbnail(selectedFile);
    setFieldValue("thumbnail", selectedFile);
  };
  const deleteThumbnail = () => {
    setThumbnail(null);
    setFieldValue("thumbnail", null);
  };
  const router = useRouter();
  const handleCancel = () => {
    router.push("/");
  };
  const getStateData = (e: any) => {
    setEditorState(e);
    let html = convertToHTML(editorState.getCurrentContent());
    setFieldValue("description", html);
  };
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
      });
      setCategories(response.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message);

      console.log(error);
    }
  };
  useEffect(() => {
    userData = JSON.parse(Cookies.get("userData") || "{}");
    console.log(userData);
    setUserData(userData);
    getAllCategory();

    // Check if blog.description is provided and set it in the editorState
    if (blog?.description) {
      const contentState = convertFromHTML(blog.description);
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [Cookies.get("userData")]);

  const initialValues: MyFormValues = {
    title: blog?.title || "",
    thumbnail: blog?.thumbnail || "",
    description: blog?.description || "",
    category: "",
  };
  const postSchema = yup.object().shape({
    title: yup
      .string()
      .required("Title is required")
      .min(10, "Enter minimum 10 characters")
      .max(200, "Max characters limit is 200"),
    thumbnail: yup.mixed().required("Thumbnail is required"),
    category: yup.string(),
    description: yup
      .string()
      .required("Description is required")
      .min(50, "Enter minimum 50 characters"),
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
      let formData = new FormData();
      formData.append("title", values.title);
      formData.append("thumbnail", values.thumbnail);
      formData.append("category", values.category);
      formData.append("description", values.description);
      setLoading(true);

      try {
        console.log("object, user"), userData;
        let res = await axios({
          method: "post",
          url: "https://blogcrudapp.vercel.app/blogs",
          data: formData,
          headers: {
            "Content-Type": `multipart/form-data`,
            Authorization: `Bearer ${userData?.token}`,
          },
        });
        if (res.status === 201) {
          toast.success("Post sent for approval!");
          // action.resetForm();
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
  // console.log("usedsfds", userData);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-500 mb-4 mt-8 text-center ">
        Create blog
      </h1>

      <p className="text-gray-500 text-sm md:text-lg text-center mb-3 ">
        Express your thoughts and enrich people with your glamorous thoughts.
      </p>
      <form
        className=" bg-white rounded-lg md:shadow-xl  md:p-8 mb-8"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="title"
          className="block text-gray-700 text-sm font-semibold"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`input ${
            errors.title && touched.title
              ? "border-red-500"
              : "focus:border-green-500"
          }`}
          placeholder="Enter blog post title"
        />
        {errors.title && touched.title ? (
          <div className="error">{errors.title}</div>
        ) : null}
        <label className="label">Thumbnail Image:</label>
        <input
          type="file"
          accept="image/*"
          id="thumbnail"
          onChange={handleThumbnailChange}
          onBlur={handleBlur}
          className={`input ${
            errors.thumbnail && touched.thumbnail
              ? "border-red-500"
              : "focus:border-green-500"
          }`}
        />
        {errors.thumbnail && touched.thumbnail ? (
          <p className="error">{errors.thumbnail}</p>
        ) : null}

        {thumbnail && (
          <div className="mt-2 ">
            <img
              src={URL.createObjectURL(thumbnail)}
              alt="Thumbnail Preview"
              className="rounded"
              style={{ maxWidth: "200px" }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="red"
              className="w-5 h-5 cursor-pointer"
              onClick={deleteThumbnail}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </div>
        )}
        <label htmlFor="category" className="label">
          Category
        </label>
        <select
          value={values.category}
          onChange={handleChange}
          onBlur={handleBlur}
          name="category"
          id="category"
          className="input"
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.category}>
              {cat.category}
            </option>
          ))}
        </select>
        {errors.category && touched.category ? (
          <p className="error">{errors.category}</p>
        ) : null}
        <label className="label">Description:</label>
        <Editor
          editorStyle={{ height: "200px", overflowY: "auto" }}
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={(e) => getStateData(e)}
        />
        {errors.description && touched.description ? (
          <p className="error">{errors.description}</p>
        ) : null}
        <div className="flex flex-col md:flex-row gap-3 mt-4">
          <button type="button" className="btn-empty" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="btn">
            Create Blog Post
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreateBlog;
