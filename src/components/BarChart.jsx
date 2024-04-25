import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import {
  getMonthlyRevenue,
  selectMonthlyRevenue,
} from "../redux/features/productSlice";

const data = [
  { month: "Jan", sales: 2000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 6000 },
  { month: "May", sales: 8000 },
  { month: "Jun", sales: 10000 },
  { month: "Jul", sales: 12000 },
  { month: "Aug", sales: 15000 },
  { month: "Sep", sales: 18000 },
  { month: "Oct", sales: 20000 },
  { month: "Nov", sales: 25000 },
  { month: "Dec", sales: 30000 },
];

const ResponsiveAdvancedBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{ top: 30, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ResponsiveAdvancedBarChart;
