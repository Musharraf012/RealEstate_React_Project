// import React from "react";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Paper from "@mui/material/Paper";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import axios from "axios";
// import authFetch from "../Custom";

// const LeadForm = ({toggleDrawer}) => {
//   const validationSchema = yup.object({
//     leadStatus: yup
//       .string("Enter lead status")
//       .required("Lead status is required"),
//     leadName: yup.string("Enter lead name").required("Lead name is required"),
//     leadEmail: yup
//       .string("Enter lead email")
//       .email("Enter a valid email")
//       .required("Lead email is required"),
//     leadPhoneNumber: yup
//       .string("Enter lead phone number")
//       .matches(/^\d{10}$/, "Lead phone number should be 10 digits long")
//       .required("Lead phone number is required"),
//     moduleId: yup.string().required("Module ID is required"),
//   });
//   const theme = createTheme();

//   const formik = useFormik({
//     initialValues: {
//       leadStatus: "",
//       leadName: "",
//       leadEmail: "",
//       leadPhoneNumber: "",
//       moduleId: "666684a4cdcc241d9806bf2d",
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       try {
//         authFetch.post("/form/add", values).then((response) => {
//           console.log(response.data);
//           toggleDrawer(false)
//         });
//       } catch (error) {
//         console.error(error);
//       }
//     },
//   });
//   return (
//     <ThemeProvider theme={theme}>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           minHeight: "100vh",
//           backgroundColor: "#ffffff",
//         }}
//       >
//         <Paper elevation={3} sx={{ padding: 4, maxWidth: 500, width: "100%" }}>
//           <Typography variant="h5" component="h1" gutterBottom align="center">
//             Lead Form
//           </Typography>
//           <form onSubmit={formik.handleSubmit}>
//             <TextField
//               fullWidth
//               id="leadStatus"
//               name="leadStatus"
//               label="Lead Status"
//               value={formik.values.leadStatus}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               error={
//                 formik.touched.leadStatus && Boolean(formik.errors.leadStatus)
//               }
//               helperText={formik.touched.leadStatus && formik.errors.leadStatus}
//               margin="normal"
//             />
//             <TextField
//               fullWidth
//               id="leadName"
//               name="leadName"
//               label="Lead Name"
//               value={formik.values.leadName}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               error={formik.touched.leadName && Boolean(formik.errors.leadName)}
//               helperText={formik.touched.leadName && formik.errors.leadName}
//               margin="normal"
//             />
//             <TextField
//               fullWidth
//               id="leadEmail"
//               name="leadEmail"
//               label="Lead Email"
//               value={formik.values.leadEmail}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               error={
//                 formik.touched.leadEmail && Boolean(formik.errors.leadEmail)
//               }
//               helperText={formik.touched.leadEmail && formik.errors.leadEmail}
//               margin="normal"
//             />
//             <TextField
//               fullWidth
//               id="leadPhoneNumber"
//               name="leadPhoneNumber"
//               label="Lead Phone Number"
//               value={formik.values.leadPhoneNumber}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               error={
//                 formik.touched.leadPhoneNumber &&
//                 Boolean(formik.errors.leadPhoneNumber)
//               }
//               helperText={
//                 formik.touched.leadPhoneNumber && formik.errors.leadPhoneNumber
//               }
//               margin="normal"
//             />
//             <Button
//               color="primary"
//               variant="contained"
//               fullWidth
//               type="submit"
//               sx={{ mt: 2 }}
//             >
//               Submit
//             </Button>
//           </form>
//         </Paper>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default LeadForm;

import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import authFetch from "../Custom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const LeadForm = ({ toggleDrawer, selectedId, setId }) => {
  const validationSchema = yup.object({
    leadStatus: yup
      .string("Enter lead status")
      .required("Lead status is required"),
    leadName: yup.string("Enter lead name").required("Lead name is required"),
    leadEmail: yup
      .string("Enter lead email")
      .email("Enter a valid email")
      .required("Lead email is required"),
    leadPhoneNumber: yup
      .string("Enter lead phone number")
      .matches(/^\d{10}$/, "Lead phone number should be 10 digits long")
      .required("Lead phone number is required"),
    moduleId: yup.string().required("Module ID is required"),
  });

  const theme = createTheme();
  useEffect(() => {
    if (selectedId.length > 0) {
      authFetch.get(`lead/view/${selectedId}`).then((y) => {
        formik.setValues({
          ...y.data.lead,
          moduleId: formik.values.moduleId, 
        });
      });
    }
  }, [selectedId, toggleDrawer]);

  const formik = useFormik({
    initialValues: {
      leadStatus: "",
      leadName: "",
      leadEmail: "",
      leadPhoneNumber: "",
      moduleId: "666684a4cdcc241d9806bf2d",
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      try {
        if (selectedId == 0) {
          const response = await authFetch.post("/form/add", values);
          console.log(response.data);
          toggleDrawer(); // Close the drawer upon successful form submission
        } else {
          const response = await authFetch.put(
            `/form/edit/${selectedId[0]}`,
            values
          );
          console.log(response.data);
          console.log(selectedId);
          setId([]);
          toggleDrawer(); // Close the drawer upon successful form submission
          console.log(selectedId);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
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
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 500, width: "100%" }}>
          <Typography variant="h5" component="h1" gutterBottom align="center">
            Lead Form
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            {/* <TextField
              fullWidth
              id="leadStatus"
              name="leadStatus"
              label="Lead Status"
              value={formik.values.leadStatus}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.leadStatus && Boolean(formik.errors.leadStatus)
              }
              helperText={formik.touched.leadStatus && formik.errors.leadStatus}
              margin="normal"
            /> */}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Lead Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                fullWidth
                id="leadStatus"
                name="leadStatus"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.leadStatus}
                label="Age"
                error={
                  formik.touched.leadStatus && Boolean(formik.errors.leadStatus)
                }
                helperText={
                  formik.touched.leadStatus && formik.errors.leadStatus
                }
                margin="normal"
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="sold">Sold</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              id="leadName"
              name="leadName"
              label="Lead Name"
              value={formik.values.leadName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.leadName && Boolean(formik.errors.leadName)}
              helperText={formik.touched.leadName && formik.errors.leadName}
              margin="normal"
            />
            <TextField
              fullWidth
              id="leadEmail"
              name="leadEmail"
              label="Lead Email"
              value={formik.values.leadEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.leadEmail && Boolean(formik.errors.leadEmail)
              }
              helperText={formik.touched.leadEmail && formik.errors.leadEmail}
              margin="normal"
            />
            <TextField
              fullWidth
              id="leadPhoneNumber"
              name="leadPhoneNumber"
              label="Lead Phone Number"
              value={formik.values.leadPhoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.leadPhoneNumber &&
                Boolean(formik.errors.leadPhoneNumber)
              }
              helperText={
                formik.touched.leadPhoneNumber && formik.errors.leadPhoneNumber
              }
              margin="normal"
            />
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </form>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default LeadForm;
