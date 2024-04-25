import { Paper, Typography } from "@mui/material";
import React from "react";

const InventoryTabs = ({ item }) => {
  return (
    <Paper
      className={` px-4 py-6 !rounded-xl`}
      style={{
        border: `1px solid ${item?.color}`,
      }}
    >
      <Typography variant="h5" className="uppercase !font-bold">
        {item?.title}{" "}
      </Typography>
      <Typography variant="h4" className="uppercase py-5 ">
        {item?.count}{" "}
      </Typography>
      <Typography className="uppercase py-2 !text-xl">{item?.body} </Typography>
    </Paper>
  );
};

export default InventoryTabs;
