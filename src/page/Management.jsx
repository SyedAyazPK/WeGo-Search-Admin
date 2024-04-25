import {
  Button,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import InventoryTabs from "../components/InventoryTabs";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import BarchartExample from "../components/BarChart";
import { selectUser } from "../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewProduct,
  getProducts,
  getProductsSold,
  selectProducts,
  selectSoldProducts,
} from "../redux/features/productSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Management = () => {
  const [value, setValue] = React.useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  useEffect(() => {
    dispatch(getProductsSold());
  }, []);
  const user = useSelector(selectUser);
  const soldProducts = useSelector(selectSoldProducts);
  const [products, setProducts] = useState(0);
  const [params, setParams] = React.useState({
    title: "",
    description: "",
    specialTags: "",
    amount: 0,
    quantity: 0,
  });
  const totalProducts = useSelector(selectProducts);

  const showToast = (text) => {
    toast(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <article className="px-4 py-8">
      <Typography variant="h4">Hello, {user?.user?.fullName} 👋</Typography>
      <Typography
        className="!py-2 !text-gray-600 !font-medium"
        variant="subtitle2"
      >
        From Here You Can Manage All Your Inventory
      </Typography>
      <div className="py-8 grid grid-cols-3 grid-rows-6 gap-4 w-full">
        {[
          {
            title: "Sales",
            body: "Total Completed Sales",
            count: soldProducts?.length,
            color: "#199de0",
          },
          {
            title: "Products",
            body: "Total Products in Stocks",
            count: totalProducts?.length,
            color: "#0bbe70",
          },
        ]?.map((item, i) => (
          <InventoryTabs item={item} key={i} />
        ))}
        <Paper
          className="row-span-3 !p-4 !rounded-xl "
          style={{
            border: "1px solid #fff78c",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
          >
            <Tab label="Products" {...a11yProps(1)} />
          </Tabs>
          <TabPanel className="" value={value} index={1}>
            <div className="flex flex-1  h-full w-full flex-col space-y-8">
              <TextField
                variant="outlined"
                fullWidth
                label="ENTER TITLE"
                value={params.title}
                onChange={(e) =>
                  setParams({
                    ...params,
                    title: e.target.value,
                  })
                }
              />
              <TextField
                variant="outlined"
                fullWidth
                label="ENTER DESCRIPTION"
                multiline
                rows={4}
                value={params.description}
                onChange={(e) =>
                  setParams({
                    ...params,
                    description: e.target.value,
                  })
                }
              />
              <TextField
                variant="outlined"
                fullWidth
                label="ENTER SPECIAL TAGS"
                value={params.specialTags}
                onChange={(e) =>
                  setParams({
                    ...params,
                    specialTags: e.target.value,
                  })
                }
              />

              <TextField
                variant="outlined"
                id="outlined-adornment-amount"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                label="Amount"
                value={params.amount}
                onChange={(e) =>
                  setParams({
                    ...params,
                    amount: e.target.value,
                  })
                }
              />
              <TextField
                variant="outlined"
                id="outlined-adornment-amount"
                label="Qunatity"
                value={params.quantity}
                onChange={(e) =>
                  setParams({
                    ...params,
                    quantity: e.target.value,
                  })
                }
              />
            </div>
            <Button
              fullWidth
              variant="contained"
              type="button"
              onClick={() => {
                dispatch(createNewProduct(params)).then((resp) => {
                  console.log(
                    "🚀 ~ file: Management.jsx:198 ~ dispatch ~ resp:",
                    resp
                  );
                  if (resp.payload?._id) {
                    console.log("Show Toast");
                    showToast("Item Added Successfully!");
                  }
                });
              }}
              className="!mt-12 "
            >
              SAVE
            </Button>
          </TabPanel>
          {/* <TabPanel value={value} index={1}>
            <div className="flex flex-1  h-full w-full flex-col space-y-8">
              <TextField variant="outlined" fullWidth label="ENTER TITLE" />
              <TextField
                variant="outlined"
                fullWidth
                label="ENTER DESCRIPTION"
                multiline
                rows={4}
              />
              <TextField
                variant="outlined"
                fullWidth
                label="ENTER SPECIAL TAGS"
              />

              <TextField
                variant="outlined"
                id="outlined-adornment-amount"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                label="Amount"
              />
              <TextField
                variant="outlined"
                id="outlined-adornment-amount"
                label="Qunatity"
              />
            </div>
            <Button fullWidth variant="contained" className="!mt-12 ">
              SAVE
            </Button>
          </TabPanel> */}
        </Paper>
        <div className="col-span-2 row-span-2">{/* <BarchartExample /> */}</div>
      </div>
    </article>
  );
};

export default Management;
