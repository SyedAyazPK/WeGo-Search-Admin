import {
  GroupOutlined,
  GroupWorkOutlined,
  HighQualityOutlined,
  PriceCheckOutlined,
} from "@mui/icons-material";
import { Paper, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LineChartExample from "../components/Linechart";
import {
  getMonthlyRevenue,
  getProducts,
  getStats,
  selectMonthlyRevenue,
  selectStats,
} from "../redux/features/productSlice";
import { selectUser } from "../redux/features/userSlice";

const Dashboard = () => {
  const user = useSelector(selectUser);

  const stats = useSelector(selectStats);
  console.log("🚀 ~ file: Dashboard.jsx:17 ~ Dashboard ~ stats:", stats);
  const dispatch = useDispatch();
  const monthlyRevenue = useSelector(selectMonthlyRevenue);
  console.log(
    "🚀 ~ file: BarChart.jsx:37 ~ ResponsiveAdvancedBarChart ~ monthlyRevenue:",
    monthlyRevenue
  );

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getStats());
    dispatch(getMonthlyRevenue());
  }, []);
  return (
    <article className="py-8 px-4">
      <Typography variant="h4">Hello, {user?.user?.fullName} 👋</Typography>
      <Typography
        className="!py-2 !text-gray-600 !font-medium"
        variant="subtitle2"
      >
        Your Current Dashboard For Today
      </Typography>
      <div className="py-3 grid grid-cols-3 !w-full gap-4 min-h-[70vh] ">
        <Paper className="!col-span-2 !w-full p-4" elevation={3}>
          <Typography variant="h6">Users Overview</Typography>
          <LineChartExample data={monthlyRevenue} />
        </Paper>
        <div className="col-span-1 grid grid-row-3 gap-8">
          <Paper className="!p-2 !relative">
            <div className="flex items-center space-x-3">
              <GroupOutlined className="text-blue-700" />
              <Typography className="!text-lg " fontWeight={200}>
                Total Users
              </Typography>
            </div>
            <div className="pt-3 space-y-3">
              <Typography variant="h4" fontWeight={200}>
                {stats?.totalSold}
              </Typography>
              <div className="absolute bottom-4">
                {/* <Typography variant="subtitle1" fontWeight={400}>
                  <span className="text-[#0bbe70] ">15%</span> From The Last
                  Month
                </Typography> */}
              </div>
            </div>
          </Paper>
          <Paper className="!p-2 !relative">
            <div className="flex items-center space-x-3">
              <GroupWorkOutlined className="text-red-700" />
              <Typography className="!text-lg " fontWeight={200}>
                Service Providers
              </Typography>
            </div>
            <div className="pt-3 space-y-3">
              <Typography variant="h4" fontWeight={200}>
                {stats?.totalNotSold}
              </Typography>
              <div className="absolute bottom-4">
                {/* <Typography variant="subtitle1" fontWeight={400}>
                  <span className="text-[#0bbe70] ">15%</span> From The Last
                  Month
                </Typography> */}
              </div>
            </div>
          </Paper>
          <Paper className="!p-2 !relative">
            <div className="flex items-center space-x-3">
              <HighQualityOutlined className="text-green-700" />
              <Typography className="!text-lg " fontWeight={200}>
                Top Service Providers
              </Typography>
            </div>
            <div className="pt-3 space-y-3">
              <Typography variant="h4" fontWeight={200}>
                {stats?.totalSold + stats?.totalNotSold}{" "}
              </Typography>
              <div className="absolute bottom-4">
                {/* <Typography variant="subtitle1" fontWeight={400}>
                  <span className="text-[#0bbe70] ">15%</span> From The Last
                  Month
                </Typography> */}
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </article>
  );
};

export default Dashboard;
