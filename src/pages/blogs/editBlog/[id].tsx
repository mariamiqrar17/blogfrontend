import CreateBlogs from "@/components/CreateBlogs";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import AuthAndRoleCheck from "@/components/AuthAndRoleCheck";
const EditBlog = () => {
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

  const [loading, setLoading] = useState(true);
  let [userData, setUserData] = useState<UserData>(); // You can initialize it with an empty object
  const [blog, setBlog] = useState<Blog | null>(null);
  const router = useRouter();
  const { id } = router.query;

  const getSingleChallenge = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: `https://blogcrudapp.vercel.app/blogs/${id}`,
        headers: {
          // "Content-Type": `multipart/form-data`,
          Authorization: `Bearer ${userData?.token}`,
        },
        // data: values,
      });
      setBlog(response.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(true);

      toast.error(error.response?.data?.message);
      setLoading(false);

      // console.log(error);
    }
  };
  useEffect(() => {
    userData = JSON.parse(Cookies.get("userData") || "{}");
    setUserData(userData);
    // getSingleChallenge();
  }, [Cookies.get("userData")]);

  useEffect(() => {
    if (id) {
      getSingleChallenge();
    }
  }, [id]);

  return <div>{blog !== null && <CreateBlogs blog={blog} isEdit={true} />}</div>;
};

export default AuthAndRoleCheck(EditBlog, ["writer"]);
