import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-1/3">
            <h3 className="text-xl font-semibold text-blue-400 mb-2">
              Connect with Us
            </h3>
            <div className="flex justify-center md:justify-start gap-4 py-3 space-x-4">
              <a
                href="#"
                className="text-white hover:text-blue-500 transition duration-300"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="text-white hover:text-blue-600 transition duration-300"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="text-white hover:text-blue-600 transition duration-300"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="text-white hover:text-blue-600 transition duration-300"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            
          </div>
          <div>
              <p className="py-2 text-sm">© {new Date().getFullYear()} BLOGBUSTER</p>
            </div>
          <div className="flex justify-between items-center">
           
            <ul className="py- flex space-x-4">
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-green-400"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-green-400"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-green-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
