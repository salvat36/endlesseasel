import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { UserContext } from "../context/UserProvider";
import { ErrorContext } from "../context/ErrorProvider";
import Error from "./Error";
import Typography from "@mui/material/Typography";
import { Button, ToggleButton } from "@mui/material";

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
    <div>
      <h1> Please Login or Signup!</h1>
      <h2>{isLoggedIn ? "Already a User?" : "Not a User?"}</h2>
      <form onSubmit={formik.handleSubmit}>
        <>
          <label>Username: </label>
          <input
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.username && formik.touched.username && (
            <Typography variant="body2" color="error">
              {formik.errors.username}
            </Typography>
          )}
        </>
        <>
          <label>Password: </label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && (
            <Typography variant="body2" color="error">
              {formik.errors.password}
            </Typography>
          )}
        </>
        {!isLoggedIn ? (
          <>
            <label>Email: </label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <Typography variant="body2" color="error">
                {formik.errors.email}
              </Typography>
            )}
          </>
        ) : null}
        <Button variant="contained" color="neutral" type="submit">
          {" "}
          {isLoggedIn ? "Login" : "Create"}{" "}
        </Button>
      </form>
      <span>
        {isLoggedIn ? "Need a new account?" : "Already have an account?"}
        <ToggleButton variant="contained" onClick={handleLogin}>
          {" "}
          {isLoggedIn ? "Create" : "Login"}{" "}
        </ToggleButton>
      </span>
      {error ? <Error /> : <></>}
    </div>
  );
};

export default Register;
