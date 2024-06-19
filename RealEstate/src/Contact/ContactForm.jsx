// import React from "react";
// import ReactDOM from "react-dom";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import axios from "axios";
// import authFetch from "../Custom";
// import { Grid } from "@mui/material";

// export default function ContactForm() {
//   const validationSchema = yup.object({
//     email: yup
//       .string("Enter your email")
//       .email("Enter a valid email")
//       .required("Email is required"),
//     phoneNumber: yup
//       .string("Enter your phoneNumber")
//       .matches(/^\d{10}$/, "phone number should be 10 digits long")
//       .required("phoneNumber is required"),
//     moduleId: yup
//       .string("Enter your moduleId")
//       .required("moduleId is required"),
//   });

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       phoneNumber: "",
//       moduleId: "666684a4cdcc241d9806bf4b",
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       authFetch.post("/form/add", values).then((response) => {
//         console.log(response.data);
//       });
//     },
//   });
//   return (
//     <div>
//       <form onSubmit={formik.handleSubmit}>
//         <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
//           <Grid TextField xs={6}>
//           <TextField
//           fullWidth
//           id="email"
//           name="email"
//           label="Email"
//           value={formik.values.email}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           error={formik.touched.email && Boolean(formik.errors.email)}
//           helperText={formik.touched.email && formik.errors.email}
//         />
//           </Grid>
//           <Grid TextField xs={6}>
//           <TextField
//           fullWidth
//           id="phoneNumber"
//           name="phoneNumber"
//           label="phoneNumber"
//           type="number"
//           value={formik.values.phoneNumber}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           error={
//             formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
//           }
//           helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
//         />
//           </Grid>
//         </Grid>

//         <Button color="primary" variant="contained" fullWidth type="submit">
//           Submit
//         </Button>
//       </form>
//     </div>
//   );
// }

import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Grid, Container, Typography } from "@mui/material";
import authFetch from "../Custom";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  phoneNumber: yup
    .string("Enter your phone number")
    .matches(/^\d{10}$/, "Phone number should be 10 digits long")
    .required("Phone number is required"),
  moduleId: yup
    .string("Enter your module ID")
    .required("Module ID is required"),
});

export default function ContactForm() {
  const formik = useFormik({
    initialValues: {
      email: "",
      phoneNumber: "",
      moduleId: "666684a4cdcc241d9806bf4b",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      authFetch.post("/form/add", values).then((response) => {
        console.log(response.data);
      });
    },
  });

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center">
        Contact Form
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} rowSpacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              type="text"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
            />
          </Grid>

          <Grid item xs={12}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
