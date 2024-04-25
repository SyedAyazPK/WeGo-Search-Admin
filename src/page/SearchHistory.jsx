import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyDataGrid from "../components/DataGrid";
import {
  deleteProduct,
  getProducts,
  selectProducts,
  sellProduct,
} from "../redux/features/productSlice";
import { selectUser } from "../redux/features/userSlice";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { useState } from "react";
import {
  createService,
  getServices,
  selectServices,
} from "../redux/features/servicesSlice";
import {
  createHistory,
  deleteAll,
  deleteHistory,
  getHistory,
  selectHistory,
} from "../redux/features/searchHistorySlice";
import SearchHistoryDataGrid from "../components/SearchHistoryDataGrid";

const SearchHistory = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const [history, setHistory] = useState("");
  const [open, setOpen] = useState(false);
  const historyData = useSelector(selectHistory);
  useEffect(() => {
    // dispatch(getProducts());
    // dispatch(getServices());
    dispatch(getHistory());
  }, []);
  return (
    <article className="px-4 py-8">
      <div className="flex items-center justify-between">
        <div>
          <Typography variant="h4">Hello, {user?.fullName} 👋</Typography>
          <Typography
            className="!py-2 !text-gray-600 !font-medium"
            variant="subtitle2"
          >
            Here Your History Data
          </Typography>
        </div>
        <Button
          onClick={() => {
            dispatch(deleteAll());
          }}
          color="error"
        >
          Clear All History
        </Button>
      </div>

      <SearchHistoryDataGrid
        docs={historyData?.data}
        deleteOnClick={(id) => {
          dispatch(deleteHistory(id)).then(() => {
            dispatch(getHistory());
          });
        }}
      />
    </article>
  );
};

export default SearchHistory;
