import React from "react";
import Topbar from "./Topbar";
import Footer from "./Fotter";

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Topbar />
      <div>{children}</div>
      <Footer/>
    </>
  );
};

export default Layout;
