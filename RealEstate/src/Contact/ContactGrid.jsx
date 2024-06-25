// import React, { useEffect, useState } from "react";
// import Box from "@mui/material/Box";
// import { DataGrid } from "@mui/x-data-grid";
// import authFetch from "../Custom";
// import { IconButton, MenuItem } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { Menu } from "@mui/icons-material";

// export default function ContactGrid(props) {
//   const { toggleDrawer } = props;
//   const [data, setData] = useState([]);
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//   const ITEM_HEIGHT = 48;
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   useEffect(() => {
//     authFetch.get("/contact").then((y) => {
//       console.log(y.data);
//       setData(
//         y.data.map((v) => {
//           console.log(v);
//           return { ...v, id: v._id };
//         })
//       );
//     });
//   }, [toggleDrawer]);
//   const columns = [
//     { field: "id", headerName: "ID", width: 90 },
//     {
//       field: "email",
//       headerName: "Email",
//       width: 150,
//       editable: true,
//     },
//     {
//       field: "phoneNumber",
//       headerName: "PhoneNumber",
//       width: 150,
//       editable: true,
//     },
//     {
//       field: "action",
//       headerName: "Action",
//       width: 150,
//       editable: true,
//       renderCell: (params) => {
//         return (
//           <IconButton
//           aria-label="more"
//           id="long-button"
//           aria-controls={open ? "long-menu" : undefined}
//           aria-expanded={open ? "true" : undefined}
//           aria-haspopup="true"
//           onClick={handleClick}
//         >
//           <MoreVertIcon />
//         </IconButton>
//         );
//       },
//     },
//   ];

//   return (
//     <Box sx={{ height: 400, width: "100%" }}>
//       <DataGrid
//         rows={data}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: {
//               pageSize: 5,
//             },
//           },
//         }}
//         pageSizeOptions={[5]}
//         checkboxSelection
//         disableRowSelectionOnClick
//       />
//       <Menu
//         id="long-menu"
//         MenuListProps={{
//           "aria-labelledby": "long-button",
//         }}
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         PaperProps={{
//           style: {
//             maxHeight: ITEM_HEIGHT * 4.5,
//             width: "20ch",
//           },
//         }}
//       >
//         <MenuItem onClick={handleClose}>Delete</MenuItem>
//         <MenuItem onClick={handleClose}>Edit</MenuItem>
//         <MenuItem onClick={handleClose}>View</MenuItem>
//       </Menu>

//     </Box>
//   );
// }

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import authFetch from "../Custom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function ContactGrid(props) {
  const { toggleDrawer, id, setId, opendrawer } = props;
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dopen, dsetOpen] = React.useState(false);
  const handleClickOpen = () => {
    dsetOpen(true);
    handleClose();
  };

  const dhandleClose = () => {
    dsetOpen(false);
  };
  const handleDelete = (id) => {
    dhandleClose();
    authFetch.post("/contact/deleteMany", [id]).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  };
  const handleEdit=()=>{
    opendrawer();
    handleClose()
  }

  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 48;

  const handleClick = (event, selectedId) => {
    setAnchorEl(event.currentTarget);
    console.log(id);
    setId([selectedId]);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    authFetch.get("/contact").then((y) => {
      console.log(y.data);
      setData(
        y.data.map((v) => {
          
          return { ...v, id: v._id };
        })
      );
    });
  }, [toggleDrawer, dopen]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      editable: true,
    },
    {
      field: "phoneNumber",
      headerName: "PhoneNumber",
      width: 150,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={(event) => {
              handleClick(event, params.row.id);
            }}
          >
            <MoreVertIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
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
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem onClick={handleClickOpen}>
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
            Are You Sure You Want To Delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={dhandleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleDelete(id);
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
