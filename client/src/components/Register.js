import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { UserContext } from "../context/UserProvider";
import { ErrorContext } from "../context/ErrorProvider";
import Error from "./Error";
import Typography from "@mui/material/Typography";
import { Box, Button, Container, FormControlLabel, Switch, TextField} from "@mui/material";

const Register = () => {
  const history = useHistory();
  const { handleRegister, handleLogin, isLoggedIn } = useContext(UserContext);
  const { error } = useContext(ErrorContext);
  const { user } = useContext(UserContext);
  const pwRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const registerSchema = yup.object().shape({
    username: yup.string().required("Username is required").min(5).max(30),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        pwRegEx,
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character."
      ),
    email: yup.string().required("Email is required").email().min(5).max(30),
  });

  const signInSchema = yup.object().shape({
    username: yup.string().required("Username is required").min(5).max(30),
    password: yup.string().required("Password is required").min(8).max(100),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
    validationSchema: !isLoggedIn ? registerSchema : signInSchema,
    onSubmit: (values, { resetForm }) => {
      handleRegister(values);
      resetForm();
      history.push("/");
    },
  });

  if (user) {
    return null;
  }
  return (
    <Container>
      <Box mt={5} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Please Login or Signup!
        </Typography>

        <Typography variant="4" gutterBottom>
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} width="25%">
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          {!isLoggedIn && (
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          )}
          <Button 
            variant="contained" 
            color="neutral" 
            type="submit"
            sx={{ mt: 2}}
          >
              {isLoggedIn ? "Login" : "Create"}{" "}
            </Button>
        </Box>
        <FormControlLabel
          control={<Switch checked={isLoggedIn} onChange={handleLogin} />}
          label={isLoggedIn ? "Need a new account?" : "Already have an account?"}
        />
      </Box>
      {error ? <Error /> : <></>}
    </Container>
  );
};

export default Register;
