import React from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/auth";
import image1 from "../../images/space1.jpg";

const validationSchema = yup.object({
  userName: yup.string("Enter your userName").required("UserName is required"),
});

const LoginPage = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  const handleLogin = (values) => {
    let from = location.state?.from?.pathname || "/";
    auth.signin(values.userName, "guest user");
    navigate(from, { replace: true });
  };

  const formik = useFormik({
    initialValues: {
      userName: "Artemis",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  return (
    <div
      style={{
        display: "flex",
        backgroundImage: `url(${image1})`,
        backgroundRepeat: "no-repeat",
        opacity: "1",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card sx={{ maxWidth: 345, maxHeight: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Login
          </Typography>
          <div>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="userName"
                name="userName"
                label="User Name"
                value={formik.values.userName}
                onChange={formik.handleChange}
                error={
                  formik.touched.userName && Boolean(formik.errors.userName)
                }
                helperText={formik.touched.userName && formik.errors.userName}
              />
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                Sign In
              </Button>
            </form>
          </div>
          <Typography variant="body2" color="text.secondary">
            Any user name and password will work. This is only to demo a simple
            login.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};
export default LoginPage;
