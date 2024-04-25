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
  getProducts,
  selectProducts,
  sellProduct,
} from "../redux/features/productSlice";
import { selectUser } from "../redux/features/userSlice";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { useState } from "react";
import {
  createService,
  deleteService,
  getServices,
  selectServices,
  updateService,
} from "../redux/features/servicesSlice";

const Products = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const [serviceField, setServiceField] = useState("");
  const [open, setOpen] = useState(false);
  const services = useSelector(selectServices);
  const [dataObject, setDataObject] = useState({
    viewEdit: true,
    _id: "",
    name: "",
  });
  console.log("🚀 ~ file: Services.jsx:34 ~ Products ~ services:", services);
  useEffect(() => {
    // dispatch(getProducts());
    dispatch(getServices());
  }, []);
  const sales = useSelector(selectProducts);
  return (
    <article className="px-4 py-8">
      <div className="flex items-center justify-between">
        <div>
          <Typography variant="h4">Hello, {user?.fullName} 👋</Typography>
          <Typography
            className="!py-2 !text-gray-600 !font-medium"
            variant="subtitle2"
          >
            Here Your Services Data
          </Typography>
        </div>
        <Fab
          onClick={() => {
            setOpen(true);
          }}
          variant="extended"
          color="primary"
          aria-label="add"
        >
          <AddCircleOutlineOutlined sx={{ mr: 1 }} />
          Add Service
        </Fab>
      </div>

      <MyDataGrid
        docs={services?.services}
        editOnClick={(data) => {
          setDataObject({
            _id: data._id,
            name: data?.service,
            viewEdit: true,
          });
          setServiceField(data?.service);
          setOpen(true);
        }}
        deleteOnClick={(id) => {
          dispatch(deleteService(id)).then(() => {
            dispatch(getServices());
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
            {dataObject?.viewEdit
              ? "Update Existing Service"
              : "Add A New Service"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            className="mt-4"
            variant="outlined"
            fullWidth
            label="Enter Service Name"
            value={serviceField}
            onChange={(e) => setServiceField(e.target.value)}
          />
          <button
            className="py-3 rounded-xl text-center w-full justify-center bg-[#00be70] text-white mt-6 text-xl font-bold  "
            onClick={() => {
              if (dataObject?.viewEdit) {
                dispatch(
                  updateService({
                    _id: dataObject?._id,
                    service: serviceField,
                  })
                ).then((resp) => {
                  setDataObject({
                    viewEdit: false,
                  });
                  dispatch(getServices());
                  setOpen(false);
                });
              } else {
                dispatch(
                  createService({
                    service: serviceField,
                  })
                ).then(() => {
                  dispatch(getServices());
                  setOpen(false);
                });
              }
            }}
          >
            Save
          </button>
        </DialogContent>
      </Dialog>
    </article>
  );
};

export default Products;
