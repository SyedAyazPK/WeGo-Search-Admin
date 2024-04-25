import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom/dist";

const DoNavigate = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
  }, []);
  return <div></div>;
};

export default DoNavigate;
