import React from "react";
import { Typography } from "@mui/material";

const PrimaryTabs = ({
  value,
  activeValue,
  text,
  outerStyles,
  innerStyles,
  setValue,
}) => {
  return (
    <div
      onClick={() => {
        setValue(value);
      }}
      className={`${
        value == activeValue ? "bg-black " : "bg-[#f9f9f9] "
      } w-full border justify-center flex items-center transition-colors cursor-pointer py-3 ${outerStyles} `}
    >
      <Typography
        variant="h6"
        className={`uppercase  ${innerStyles} ${
          value == activeValue ? "text-[#f9f9f9] " : "text-gray-900"
        } `}
      >
        {text}{" "}
      </Typography>
    </div>
  );
};

export default PrimaryTabs;
