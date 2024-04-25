import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  DeleteOutlineOutlined,
  SellOutlined,
  ShoppingCartCheckout,
} from "@mui/icons-material";

export default function SearchHistoryDataGrid({
  docs,
  editOnClick,
  deleteOnClick,
}) {
  console.log("🚀 ~ file: DataGrid.jsx:10 ~ DataTable ~ docs:", docs);
  const columns = [
    { field: "_id", headerName: "ID", width: 150 },
    {
      field: "text",
      headerName: "Text",
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
