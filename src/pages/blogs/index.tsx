import BlogCard from "@/components/BlogCard";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

const blogs = () => {
  let [userData, setUserData] = useState<UserData>(); // You can initialize it with an empty object
  const [blogs, setBlogs] = useState<Blog[]>([]);

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

  const getAllBLogs = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:3001/blogs/all",
        headers: {
          // "Content-Type": `multipart/form-data`,
          Authorization: `Bearer ${userData?.token}`,
        },
        // data: values,
      });
      setBlogs(response.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message);

      console.log(error);
    }
  };
  useEffect(() => {
    userData = JSON.parse(Cookies.get("userData") || "{}");
    setUserData(userData);
    getAllBLogs();
}, [Cookies.get("userData")]);
console.log("",blogs);
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-500 mb-4 mt-8 text-center ">
        Latest Blog Posts
      </h1>

      <p className="text-gray-500 text-sm md:text-lg text-center mb-6 ">
        Explore our latest blog posts and stay informed about various topics.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog, index) => (
          <BlogCard key={index} {...blog} />
        ))}
      </div>
    </div>
  );
};

export default blogs;
