import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import authFetch from "../Custom";

import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export default function LeadGrid(props) {
  const { selectedId, setId, toggleDrawer,opendrawer } = props;
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dopen, dsetOpen] = React.useState(false);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const handleClickOpen = () => {
    dsetOpen(true);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const handleClick = (event, params) => {
    setAnchorEl(event.currentTarget);
    setId([params.row._id]);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dhandleClose = () => {
    dsetOpen(false);
  };
  const deleteRecord = (selectedId) => {
    console.log(selectedId);

    authFetch.post("/lead/deleteMany", selectedId).then((y) => {
      setData(y.data);
      console.log(y.data);
      dhandleClose();
    });
  };
  const handleEdit = () => {
    opendrawer();

    handleClose();
  };
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
  }, [dopen, selectedId, toggleDrawer]);
  const columns = [
    { field: "id", headerName: "ID", width: 90 },

    {
      field: "leadStatus",
      headerName: "leadStatus",
      type: "number",
      width: 110,
      editable: true,
      renderCell: (params) => {
        // console.log(params);
        return (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                backgroundColor: "#ffffff",
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Lead Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  fullWidth
                  id="leadStatus"
                  name="leadStatus"
                  // onChange={handleChange}

                  value={params.row.leadStatus}
                  margin="normal"
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="sold">Sold</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </>
        );
      },
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
            onClick={(event) => {
              handleClick(event, params);
              console.log(params.row.id);
            }}
          >
            <MoreVertIcon />
          </IconButton>
        );
      },
    },
  ];
  return (
    <Box sx={{ height: 600, width: "100%" }}>
       { selectedId.length >1 && <Button onClick={handleClickOpen}>Delete</Button> }
      <DataGrid
        rows={data}
        columns={columns}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          console.log(newRowSelectionModel);
          setId(newRowSelectionModel)
        }}
        
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
        <MenuItem
          onClick={() => {
            handleClickOpen();
          }}
        >
          <DeleteIcon sx={{ mr: 1, color: "red" }} />
          Delete
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <EditNoteIcon sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <VisibilityIcon sx={{ mr: 1, color: "dodgerblue" }} />
          View
        </MenuItem>
      </Menu>
      <Dialog
        open={dopen}
        onClose={dhandleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure.You want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={dhandleClose}>Cancel</Button>
          <Button
            onClick={() => {
              deleteRecord(selectedId);
            }}
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
