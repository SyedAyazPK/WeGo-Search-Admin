import {
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
  getProductsSold,
  selectSoldProducts,
} from "../redux/features/productSlice";
import {
  approveUser,
  deleteUser,
  getUsers,
  selectUser,
  selectUsers,
  updateUser,
} from "../redux/features/userSlice";
import {
  AddBoxOutlined,
  AddCircleOutlineOutlined,
  AddOutlined,
  PlusOneOutlined,
} from "@mui/icons-material";
import UsersDataGrid from "../components/UsersDataGrid";
import { useState } from "react";
import PrimaryTabs from "../components/PrimaryTabs";

const Sales = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const data = useSelector(selectUsers);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [dataObject, setDataObject] = useState({
    viewEdit: false,
    _id: "",
    name: "",
    email: "",
    password: "",
    role: "",
  });
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const sales = useSelector(selectSoldProducts);
  return (
    <article className="px-4 py-8">
      <div className="flex items-center justify-between">
        <div>
          <Typography variant="h4">Hello, {user?.fullName} 👋</Typography>
          <Typography
            className="!py-2 !text-gray-600 !font-medium"
            variant="subtitle2"
          >
            Here Your Users Data
          </Typography>
        </div>
        {/* <Fab
          onClick={() => {
            setOpen(true);
          }}
          variant="extended"
          color="primary"
          aria-label="add"
        >
          <AddCircleOutlineOutlined sx={{ mr: 1 }} />
          Add User
        </Fab> */}
      </div>

      <UsersDataGrid
        docs={data}
        deleteOnClick={(id) => {
          dispatch(deleteUser(id)).then((resp) => {
            dispatch(getUsers());
          });
        }}
        editOnClick={(dataObject) => {
          setDataObject({
            _id: dataObject._id,
            name: dataObject?.name,
            email: dataObject?.email,
            password: dataObject?.password,
            role: dataObject?.role,
            viewEdit: dataObject?.viewEdit,
          });
          setOpen(true);
        }}
        approveAccount={(id) => {
          dispatch(approveUser(id)).then(() => {
            dispatch(getUsers());
          });
        }}
      />

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle className="py-6  justify-center text-center  ">
          <Typography variant="h6" className="uppercase !font-bold">
            {dataObject?.viewEdit ? "Update Existing User" : "Add A New User"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <div className="flex items-center my-6">
            <PrimaryTabs
              value={0}
              activeValue={value}
              setValue={setValue}
              text={"User"}
            />
            <PrimaryTabs
              value={1}
              activeValue={value}
              setValue={setValue}
              text={"Vendor"}
            />
          </div>
          <TextField
            className="!mt-4"
            variant="outlined"
            fullWidth
            label="Enter User Name"
            value={dataObject?.name}
            onChange={(e) =>
              setDataObject({
                ...dataObject,
                name: e.target.value,
              })
            }
          />
          <TextField
            className="!mt-4"
            variant="outlined"
            fullWidth
            label="Enter Email "
            value={dataObject?.email}
            onChange={(e) =>
              setDataObject({
                ...dataObject,
                email: e.target.value,
              })
            }
          />
          <TextField
            className="!mt-4"
            variant="outlined"
            fullWidth
            label="Enter Password "
            value={dataObject?.password}
            onChange={(e) =>
              setDataObject({
                ...dataObject,
                password: e.target.value,
              })
            }
          />

          <button
            className="py-3 rounded-xl text-center w-full justify-center bg-[#00be70] text-white mt-6 text-xl font-bold  "
            onClick={() => {
              const role = value === 0 ? "user" : "vendor";
              dispatch(updateUser(Object.assign(dataObject, { role }))).then(
                (resp) => {
                  dispatch(getUsers());
                  setOpen(false);
                }
              );
            }}
          >
            Save
          </button>
        </DialogContent>
      </Dialog>
    </article>
  );
};

export default Sales;
