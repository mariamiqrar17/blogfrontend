import HomePageBanner from "@/components/Banner";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    async function fetchBlogData() {
      try {
        const response = await fetch("/api/blogs");  
        if (response.ok) {
          const data = await response.json();
          setBlogData(data);
        } else {
          console.error("Failed to fetch blog data");
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    }

    fetchBlogData();
  }, []);

  return (
    <>
      <HomePageBanner />

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-500 mb-4 mt-8 text-center ">
          All Blog Posts
        </h1>

        <p className="text-gray-500 text-sm md:text-lg text-center mb-6 ">
          Explore our latest blog posts and stay informed about various topics.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogData.map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))}
        </div>
        <div className="flex justify-center m-6">
          <Link
            href="/blogs"
            className="text-white text-sm py-2 px-4 md:text-white bg-blue-700 md:py-2 md:px-6 rounded-full md:text-lg font-semibold hover:bg-green-600 transition duration-300 inline-block"
          >
            Explore All Blogs
          </Link>
        </div>
      </div>
    </>
  );
}
