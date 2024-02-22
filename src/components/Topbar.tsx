import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { data } from "autoprefixer";
import logo from "../logo.png";
import Image from "next/image";

const Topbar: React.FC = () => {
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

  const pathname = usePathname();
  let [userData, setUserData] = useState<UserData>(); // You can initialize it with an empty object

  useEffect(() => {
    userData = JSON.parse(Cookies.get("userData") || "{}");
    console.log(userData);
    setUserData(userData);
  }, [Cookies.get("userData")]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Function to toggle the mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const handleLogout = () => {
    // Delete the 'user_data' cookie
    Cookies.remove("userData");
  };

  return (
    <>
      <nav className="bg-white shadow-lg sticky top-0">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex justify-between">
            <div>
              <Link href="/" className="flex items-center py-4">
                <div className="relative w-16 h-14 mr-3">
                  {" "}
                  <Image src={logo} alt="Logo" width={64} height={64} />{" "}
                </div>
                <span className="font-bold text-gray-500 text-2xl">
                  BLOG BUSTER
                </span>
              </Link>
            </div>

            {!userData?.user ? (
              <div className="flex space-x-7">
                <div className="md:flex items-center gap-5 hidden">
                  <Link
                    href="/"
                    className={`${
                      pathname === "/" ? "active-navlinks" : "inactive-navlinks"
                    } py-4 px-2 hover:text-blue-600 transition duration-300 font-semibold`}
                  >
                    Home
                  </Link>
                  <Link
                    href="/blogs"
                    className={`${
                      pathname === "/blogs"
                        ? "active-navlinks"
                        : "inactive-navlinks"
                    } py-4 px-2 hover:text-blue-600 transition duration-300 font-semibold`}
                  >
                    Blogs
                  </Link>
                </div>
              </div>
            ) : (
              <></>
            )}
            {userData?.user?.role === "writer" ? (
              <div className="flex space-x-7">
                <div className="md:flex items-center gap-5 hidden">
                  <Link
                    href="/"
                    className={`${
                      pathname === "/" ? "active-navlinks" : "inactive-navlinks"
                    } py-4 px-2 hover:text-blue-600 transition duration-300 font-semibold`}
                  >
                    Home
                  </Link>
                  <Link
                    href="/create-blog"
                    className={`${
                      pathname === "/create-blog"
                        ? "active-navlinks"
                        : "inactive-navlinks"
                    } py-4 px-2 hover:text-blue-600 transition duration-300 font-semibold`}
                  >
                    Add Blog
                  </Link>
                  <Link
                    href="/about"
                    className={`${
                      pathname === "/about"
                        ? "active-navlinks"
                        : "inactive-navlinks"
                    } py-4 px-2 hover:text-blue-600 transition duration-300 font-semibold`}
                  >
                    About Us
                  </Link>
                  <Link
                    href="/contactus"
                    className={`${
                      pathname === "/contactus"
                        ? "active-navlinks"
                        : "inactive-navlinks"
                    } py-4 px-2 hover:text-blue-600 transition duration-300 font-semibold`}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            ) : (
              <></>
            )}
            {userData?.user?.role === "admin" ? (
              <div className="flex space-x-7">
                <div className="md:flex items-center gap-5 hidden">
                  <Link
                    href="/"
                    className={`${
                      pathname === "/" ? "active-navlinks" : "inactive-navlinks"
                    } py-4 px-2 hover:text-blue-600 transition duration-300 font-semibold`}
                  >
                    Home
                  </Link>
                  <Link
                    href="/manage-category"
                    className={`${
                      pathname === "/services"
                        ? "active-navlinks"
                        : "inactive-navlinks"
                    } py-4 px-2 hover:text-blue-600 transition duration-300 font-semibold`}
                  >
                    Manage Category
                  </Link>
                  <Link
                    href="/about"
                    className={`${
                      pathname === "/about"
                        ? "active-navlinks"
                        : "inactive-navlinks"
                    } py-4 px-2 hover:text-blue-600 transition duration-300 font-semibold`}
                  >
                    About
                  </Link>
                  <Link
                    href="/contactus"
                    className={`${
                      pathname === "/contactus"
                        ? "active-navlinks"
                        : "inactive-navlinks"
                    } py-4 px-2 hover:text-blue-600 transition duration-300 font-semibold`}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            ) : (
              <></>
            )}
            {userData?.user ? (
              // Display user's profile circle when logged in
              <Menu as="div" className="relative top-3.5 md:left-0 left-12">
                <div>
                  <Menu.Button className="relative flex rounded-full bg-blue-600 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <span className=" text-white font-semibold text-lg">
                        {userData.user.username.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white text-black flex flex-col py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/profile"
                          className={`
                            ${active ? "bg-gray-100" : ""}
                            "block px-4 py-2 text-sm text-gray-500"
                            `}
                        >
                          Your Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/login"
                          className={`
                            ${active ? "bg-gray-100" : ""}
                            "block px-4 py-2 text-sm text-gray-500"
                            `}
                          onClick={() => {
                            handleLogout();
                          }}
                        >
                          Sign out
                        </Link>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <div className={`md:flex items-center space-x-3 hidden`}>
                <Link
                  href="/login"
                  className="py-2 px-5 font-medium  rounded hover:text-blue-600 hover:text-white transition duration-300 border-[1px] border-blue-600 text-blue-600"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="py-2 px-5 font-medium text-white bg-blue-600 rounded hover:text-blue-600 transition duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <div className="md:hidden flex items-center">
              {mobileMenuOpen ? (
                // Close button when mobile menu is open
                <button
                  className="outline-none mobile-menu-button"
                  onClick={toggleMobileMenu}
                >
                  <svg
                    className="w-6 h-6 text-gray-500 hover:text-blue-600"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              ) : (
                // Toggle button when mobile menu is closed
                <button
                  className="outline-none mobile-menu-button"
                  onClick={toggleMobileMenu}
                >
                  <svg
                    className="w-6 h-6 text-gray-500 hover:text-blue-600"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </button>
              )}
            </div>
          </div>
          {userData ? (
            <div
              className={`md:hidden ${
                mobileMenuOpen ? "block" : "hidden"
              } mobile-menu absolute top-[80px] left-0 min-h-screen w-full bg-white flex items-center flex-col`}
            >
              <Link
                href="/"
                className={`${
                  pathname === "/" ? "active-navlinks" : "inactive-navlinks"
                } py-4 px-2 hover:text-blue-600 transition duration-300 font-semibold`}
              >
                Home
              </Link>
              <Link
                href="/blogs"
                className={`${
                  pathname === "/blogs"
                    ? "active-navlinks"
                    : "inactive-navlinks"
                } py-4 px-2 hover:text-blue-600 transition duration-300 font-semibold`}
              >
                Blogs
              </Link>

              {!userData?.user ? (
                <div className="flex gap-4 pt-4 pb-5">
                  <Link
                    href="/login"
                    className="py-2 px-5 font-medium text-gray-500 rounded hover:bg-blue-600 hover:text-white transition duration-300 border-[1px] border-green-500"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    className="py-2 px-5 font-medium text-white bg-blue-600 rounded hover:bg-blue-600 transition duration-300"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : null}
            </div>
          ) : (
            <></>
          )}
          {userData?.user?.role === "writer" ? (
            <div
              className={`md:hidden ${
                mobileMenuOpen ? "block" : "hidden"
              } mobile-menu absolute top-[80px] left-0 min-h-screen w-full bg-white flex items-center flex-col`}
            >
              <Link
                href="/"
                className={`${
                  pathname === "/" ? "active-navlinks" : "inactive-navlinks"
                } py-4 px-2 hover:text-blue-600 transition duration-300 font-semibold`}
              >
                Home
              </Link>
              <Link
                href="/create-blog"
                className={`${
                  pathname === "/create-blog"
                    ? "active-navlinks"
                    : "inactive-navlinks"
                } py-4 px-2 hover:text-blue-600 transition duration-300 font-semibold`}
              >
                Add Blog
              </Link>
              <Link
                href="/about"
                className={`${
                  pathname === "/about"
                    ? "active-navlinks"
                    : "inactive-navlinks"
                } py-4 px-2 hover:text-blue-600 transition duration-300 font-semibold`}
              >
                About Us
              </Link>
              <Link
                href="/contactus"
                className={`${
                  pathname === "/contactus"
                    ? "active-navlinks"
                    : "inactive-navlinks"
                } py-4 px-2 hover:text-blue-600 transition duration-300 font-semibold`}
              >
                Contact Us
              </Link>
              {!userData?.user ? (
                <div className="flex gap-4 pt-4 pb-5">
                  <Link
                    href="/login"
                    className="py-2 px-5 font-medium text-gray-500 rounded hover:bg-blue-600 hover:text-white transition duration-300 border-[1px] border-green-500"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    className="py-2 px-5 font-medium text-white bg-blue-600 rounded hover:bg-blue-600 transition duration-300"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : null}
            </div>
          ) : (
            <></>
          )}
          {userData?.user?.role === "admin" ? (
            <div
              className={`md:hidden ${
                mobileMenuOpen ? "block" : "hidden"
              } mobile-menu absolute top-[80px] left-0 min-h-screen w-full bg-white flex items-center flex-col`}
            >
              <Link
                href="/"
                className={`${
                  pathname === "/" ? "active-navlinks" : "inactive-navlinks"
                } py-4 px-2 hover:text-blue-600 transition duration-300 font-semibold`}
              >
                Home
              </Link>
              <Link
                href="/manage-category"
                className={`${
                  pathname === "/manage-category"
                    ? "active-navlinks"
                    : "inactive-navlinks"
                } py-4 px-2 hover:text-blue-600 transition duration-300 font-semibold`}
              >
                Manage Category
              </Link>
              <Link
                href="/about"
                className={`${
                  pathname === "/about"
                    ? "active-navlinks"
                    : "inactive-navlinks"
                } py-4 px-2 hover:text-blue-600 transition duration-300 font-semibold`}
              >
                About
              </Link>
              <Link
                href="/contactus"
                className={`${
                  pathname === "/contactus"
                    ? "active-navlinks"
                    : "inactive-navlinks"
                } py-4 px-2 hover:text-blue-600 transition duration-300 font-semibold`}
              >
                Contact Us
              </Link>
              {!userData?.user ? (
                <div className="flex gap-4 pt-4 pb-5">
                  <Link
                    href="/login"
                    className="py-2 px-5 font-medium text-gray-500 rounded hover:bg-blue-600 hover:text-white transition duration-300 border-[1px] border-green-500"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    className="py-2 px-5 font-medium text-white bg-blue-600 rounded hover:bg-blue-600 transition duration-300"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : null}
            </div>
          ) : (
            <></>
          )}
        </div>
      </nav>
    </>
  );
};

export default Topbar;
