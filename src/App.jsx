import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist";
import { selectUser } from "./redux/features/userSlice";
import DoNavigate from "./DoNavigate";
import Layout from "./Layout";
import Dashboard from "./page/Dashboard";
import Login from "./page/Login";
import Services from "./page/Services";
import History from "./page/SearchHistory";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Users from "./page/Users";

const App = () => {
  const user = useSelector(selectUser);
  const [auth, setAuth] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user?.success ? <Layout /> : <DoNavigate />}>
          {/* <Route
          path="/"
          element={user?.status === "success" ? <Layout /> : <DoNavigate />}
        > */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/services" element={<Services />} />
          <Route path="/history" element={<History />} />
          {/* <Route path="/management" element={<Management />} /> */}
          <Route path="/users" element={<Users />} />
        </Route>
        <Route path="/login" element={<Login setAuth={setAuth} />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
