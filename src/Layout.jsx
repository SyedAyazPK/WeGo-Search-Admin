import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const Layout = () => {
  return (
    <main className="flex items-center">
      <Sidebar />
      <article className="w-full">
        <Outlet />
      </article>
    </main>
  );
};

export default Layout;
