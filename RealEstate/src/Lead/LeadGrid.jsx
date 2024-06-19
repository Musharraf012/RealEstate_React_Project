import { Box, IconButton, Menu } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import authFetch from "../Custom";

import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function LeadGrid() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    authFetch.get("/lead/").then((y) => {
      console.log(y.data);
      setData(
        y.data.map((v) => {
          return {
            ...v,
            id: v._id,
          };
        })
      );
    });
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 90 },

    {
      field: "leadStatus",
      headerName: "leadStatus",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "leadName",
      headerName: "leadName",

      width: 160,
    },
    {
      field: "leadPhoneNumber",
      headerName: "leadPhoneNumber",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "leadEmail",
      headerName: "leadEmail",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        return (
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
        );
      },
    },
  ];
  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            // maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem>
          <DeleteIcon sx={{ mr: 1, color: "red" }} />
          Delete
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <EditNoteIcon sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <VisibilityIcon sx={{ mr: 1, color: "dodgerblue" }} />
          View
        </MenuItem>
      </Menu>
    </Box>
  );
}
