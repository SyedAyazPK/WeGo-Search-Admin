import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  ApprovalOutlined,
  DeleteOutlineOutlined,
  EditOutlined,
  SellOutlined,
  ShoppingCartCheckout,
} from "@mui/icons-material";

export default function UsersDataGrid({
  docs,
  editOnClick,
  deleteOnClick,
  approveAccount,
}) {
  console.log("🚀 ~ file: DataGrid.jsx:10 ~ DataTable ~ docs:", docs);
  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "isVerified", headerName: "Is Verified ", flex: 1 },

    {
      field: "role",
      headerName: "Role",
      flex: 1,
    },

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
          <EditOutlined
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => editOnClick(params.row)}
          />
          <ApprovalOutlined
            style={{ cursor: "pointer", color: "yellow" }}
            onClick={() => approveAccount(params.row?._id)}
          />
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
