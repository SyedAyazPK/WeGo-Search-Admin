import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  DeleteOutlineOutlined,
  EditOutlined,
  SellOutlined,
  ShoppingCartCheckout,
} from "@mui/icons-material";

export default function DataTable({ docs, editOnClick, deleteOnClick }) {
  console.log("🚀 ~ file: DataGrid.jsx:10 ~ DataTable ~ docs:", docs);
  const columns = [
    { field: "_id", headerName: "ID", width: 150 },
    { field: "service", headerName: "Service", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <DeleteOutlineOutlined
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => deleteOnClick(params.row?._id)}
          />
          {editOnClick && (
            <EditOutlined
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => editOnClick(params.row)}
            />
          )}
        </>
      ),
    },
  ];
  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={docs || []}
        columns={columns}
        getRowId={(row) => row?._id}
        paginationMode="client"
        filterMode="client"
        sortingMode="client"
        checkboxSelection
      />
    </div>
  );
}
